/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import moment from 'moment';
import { ConfigType } from '@nestjs/config';
import config from 'config';
import { request } from 'node:https';
import { Prisma } from 'pruebaprisma';
import _ from 'lodash';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  PostData() {
    const redis = require('redis');
    const geo = require('georedis').initialize(redis, {
      zset: 'locations',
      nativeGeo: true,
    });
    const drivers = geo.addSet('drivers');

    const record = (req, res) => {
      if (!req.body.lat || !req.body.lng) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Missing coordinates',
        });
      }
      if (!req.body.time) {
        req.body.time = moment().toISOString();
      }
      if (!req.body.car_id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Missing car_id',
        });
      }

      const test = new Prisma();
      const reff = test.Test();

      const apiKey = this.configService.apikey1;
      const url = this.configService.url_gate;
      const fulfillment = this.configService.fulfillmentApi;
      const app = this.configService.app;

      const diff = moment().diff(moment(req.body.time));
      const comp = moment.duration(diff);
      const heal = Math.abs(comp.asMinutes());

      const loccation = new Promise((cb: any): any => {
        if (heal >= global._min_time_minutes_for_disconnected) {
          return cb(null, heal);
        }
        drivers.addLocation(
          req.user._id,
          {
            latitude: req.body.lat,
            longitude: req.body.lng,
          },
          function (err: any, reply: any) {
            if (err) {
              cb(err);
            } else {
              cb(null, reply);
            }
          },
        );
      });

      const tracking = new Promise((cb: any): void => {
        req.body.driver_id = req.user._id;
        req.body.location = [req.body.lat, req.body.lng];
        const postData = JSON.stringify({
          body: req.body,
        });

        const options = {
          url: `${url}/v1/${app}/tracking`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            apikey: apiKey,
          },
          qs: req.query,
        };

        const rep = request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
        });
        rep.write(postData);
        rep.end();
        (err: any, result: any, body: any) => {};
        cb();
      });

      const tracking_min = new Promise((cb: any): void => {
        req.body.driver_id = req.user._id;
        req.body.location = [req.body.lat, req.body.lng];
        const postData = JSON.stringify({
          body: req.body,
        });

        const options = {
          url: `${url}/v1/${app}/tracking_min`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            apikey: apiKey,
          },
          qs: req.query,
        };

        const rep = request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
        });
        rep.write(postData);
        rep.end();
        (err: any, result: any, body: any) => {};
        cb();
      });

      const time = new Promise((cb: any): any => {
        if (heal >= global._min_time_minutes_for_disconnected) {
          return cb(null, heal);
        }
        redis.set(
          `$_time_${req.user._id}`,
          moment(req.body.time).toISOString(),
          'EX',
          vars._min_time_minutes_for_disconnected * 60,
          function (err: any, reply: any) {
            if (err) {
              return cb(err);
            }
            return cb(null, reply);
          },
        );
      });

      const newFulfillemnt = new Promise((cb: any): void => {
        req.body.driver_id = req.user._id;
        req.body.location = [req.body.lat, req.body.lng];
        const postData = JSON.stringify({
          body: req.body,
        });

        const options = {
          url: `${fulfillment}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
          },
          qs: req.query,
        };

        const rep = request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
        });
        rep.write(postData);
        rep.end();
        (err: any, result: any, body: any) => {};
        cb();
      });

      Promise.allSettled([
        loccation,
        tracking,
        tracking_min,
        time,
        newFulfillemnt,
      ]).then((results) => {
        if (_.get(results, 'tracking.error')) {
          return res.status(HttpStatus.BAD_REQUEST).send(results);
        }
        if (_.get(results, 'location.error') || _.get(results, 'time.error')) {
          return res.status(HttpStatus.BAD_REQUEST).send(results || results);
        }
        res.status(HttpStatus.OK).send({
          result: true,
        });
      });
      record(reff, res);
    };
  }
}
