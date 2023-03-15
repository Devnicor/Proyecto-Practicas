/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable, Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { ConfigType } from '@nestjs/config';
import config from 'config';
import { Client } from 'redis-om';
import { createClient } from 'redis';
import { PrismaClient, tracking } from '@prisma/client';
import _ from 'lodash';
import fetch from 'node-fetch';
import { response } from 'express';

@Injectable()
export class TrackingService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async postData() {
    const prisma = new PrismaClient();
    const query = await prisma.tracking.findFirst();
    const redisClient = createClient({
      url: 'redis://localhost6379',
    });
    const client = new Client().use(redisClient);
    const geo = require('georedis').initialize(client, {
      zset: 'locations',
      nativeGeo: true,
    });

    const drivers = geo.addSet('drivers');
    const apiKey = this.configService.apikey1;
    const url = this.configService.url_gate;
    const fulfillment = this.configService.fulfillmentApi;
    const app = this.configService.app;
    console.log(drivers);

    const record = (req: tracking, res: any) => {
      if (!req.latitude || !req.longitude) {
        return res.status(HttpStatus.BAD_REQUEST);
      }
      if (!req.date) {
        req.date = moment().toDate();
      }
      if (!req.car_id) {
        return res.status(HttpStatus.BAD_REQUEST);
      }
      const diff = moment().diff(moment(req.date));
      const comp = moment.duration(diff);
      const heal = Math.abs(comp.asMinutes());
      console.log(heal);
      const loccation = () => {
        if (heal >= global._min_time_minutes_for_disconnected) {
          return heal;
        }
        drivers.addLocation(
          req.user_id,
          {
            latitude: req.latitude,
            longitude: req.longitude,
          },
          function (error: any, reply: any) {
            if (error) {
              return error;
            } else {
              return reply;
            }
          },
        );
      };

      const tracking = () => {
        const postData = JSON.stringify({
          body: [req.user_id, [req.latitude, req.longitude]],
        });

        fetch('http://localhost:3000/proyect/tracking', {
          method: 'POST',
          body: postData,
          headers: {
            'Content-Type': 'application/json',
            apikey: apiKey,
          },
        })
          .then((result) => result.json())
          .then((jsonformat) => console.log(jsonformat));
      };
      const tracking_min = new Promise((cb: any): void => {
        req.user_id;
        [req.latitude, req.longitude];
        const postData = JSON.stringify({
          body: req,
        });

        fetch(`${url}/v1/${app}/tracking_min`, {
          method: 'POST',
          body: postData,
          headers: {
            'Content-Type': 'application/json',
            apikey: apiKey,
          },
        })
          .then((result) => result.json())
          .then((jsonformat) => console.log(jsonformat));
        (err: any, result: any, body: any) => {};
        cb();
      });

      // const time = new Promise((cb: any): any => {
      //   if (heal >= global._min_time_minutes_for_disconnected) {
      //     return cb(null, heal);
      //   }
      //   redisClient.set(
      //     `$_time_${req.user_id}`,
      //     moment(req.date).toISOString(),
      //     'EX',
      //     vars._min_time_minutes_for_disconnected * 60,
      //     function (err: any, reply: any) {
      //       if (err) {
      //         return cb(err);
      //       }
      //       return cb(null, reply);
      //     },
      //   );
      // });

      // const newFulfillemnt = new Promise((cb: any): void => {
      //   req[10].user_id;
      //   [req[10].latitude, req[10].longitude];
      //   const postData = JSON.stringify({
      //     body: req,
      //   });

      // fetch(`${fulfillment}`, {
      //   method: 'POST',
      //   body: postData,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then((result) => result.json())
      //   .then((jsonformat) => console.log(jsonformat));
      // (err: any, result: any, body: any) => {};
      // cb();
      //});
      const p = new Promise((resolve, reject) => resolve(loccation));
      const p2 = new Promise((resolve, reject) => resolve(tracking));
      const p3 = new Promise((resolve, reject) => resolve(tracking_min));
      Promise.allSettled([p, p2, p3])
        .then((responses) => {
          // if (_.get(results, 'tracking.error')) {
          //   return res.status(HttpStatus.BAD_REQUEST).send(results);
          // }
          // if (
          //   _.get(results, 'location.error') ||
          //   _.get(results, 'time.error')
          // ) {
          //   return res.status(HttpStatus.BAD_REQUEST).send(results || results);
          // }
          // res.status(HttpStatus.OK).send({
          //   results: true,
          // });
          console.log('tasks finished');
          responses.forEach((resp) => {
            console.log({ resp });
          });
        })
        .catch((err) => {
          if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
          }
        });
    };
    record(query, response);
  }
}
