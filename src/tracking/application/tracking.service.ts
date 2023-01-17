/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import async from 'async';
import _ from 'lodash';
import moment from 'moment';
import { ConfigType } from '@nestjs/config';
import config from '.../../config';

const redis = require('redis');
const geo = require('georedis').initialize(redis, {
  zset: 'locations',
  nativeGeo: true,
});
const drivers = geo.addSet('drivers');

@Injectable()
export class TrackingService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  Service() {
    const record = (
      req: {
        body: {
          lat: any;
          lng: any;
          time: moment.MomentInput;
          car_id: any;
          driver_id: any;
          location: any[];
        };
        user: { _id: any };
        query: any;
      },
      res: {
        status: (arg0: HttpStatus) => {
          (): any;
          new (): any;
          json: { (arg0: { message: string }): any; new (): any };
          send: { (arg0: { result: boolean }): void; new (): any };
        };
      },
      next: any,
    ) => {
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

      const apiKey = this.configService.apikey;
      const url = this.configService.url_gate;
      const fulfillment = this.configService.fulfillmentApi;
      const app = this.configService.app;

      const diff = moment().diff(moment(req.body.time));
      const comp = moment.duration(diff);
      const heal = Math.abs(comp.asMinutes());

      async.parallel(
        async.reflectAll({
          location(cb: any): any {
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
          },
          tracking(cb: any): void {
            req.body.driver_id = req.user._id;
            req.body.location = [req.body.lat, req.body.lng];
            request.post(
              {
                url: `${url}/v1/${config}/tracking`,
                json: true,
                headers: {
                  apikey: apiKey,
                },
                qs: req.query,
                body: req.body,
              },
              (err: any, result: any, body: any) => {},
            );
            cb();
          },
          tracking_min(cb: any): void {
            req.body.driver_id = req.user._id;
            req.body.location = [req.body.lat, req.body.lng];
            request.post(
              {
                url: `${url}/v1/${app}/tracking_min`,
                json: true,
                headers: {
                  apikey: apiKey,
                },
                qs: req.query,
                body: req.body,
              },
              (err: any, result: any, body: any) => {},
            );
            cb();
          },
          time(cb: any): any {
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
          },
          newFulfillemnt(cb: any): void {
            req.body.driver_id = req.user._id;
            req.body.location = [req.body.lat, req.body.lng];
            request.post(
              {
                url: `${fulfillment}`,
                json: true,
                qs: req.query,
                body: req.body,
              },
              (err: any, result: any, body: any) => {},
            );
            cb();
          },
        }),
        (err, results) => {
          if (_.get(results, 'tracking.error')) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send(results.tracking.error);
          }
          if (
            _.get(results, 'location.error') ||
            _.get(results, 'time.error')
          ) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send(results.location.error || results.time.error);
          }
          res.status(HttpStatus.OK).send({
            result: true,
          });
        },
      );
    };
  }
}
