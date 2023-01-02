/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { DegreeToRadians } from './radians.convert';

@Injectable()
export class DistanceC {
  constructor(private degreeToRadians: DegreeToRadians) {}
  distance = function (lat1: any, lng1: any, lat2: any, lng2: any) {
    lat1 = parseFloat(lat1);
    lng1 = parseFloat(lng1);
    lat2 = parseFloat(lat2);
    lng2 = parseFloat(lng2);

    if (
      !_.isNumber(lat1) ||
      !_.isNumber(lng1) ||
      !_.isNumber(lat2) ||
      !_.isNumber(lng2)
    ) {
      return 0;
    }
    const R = 6371000;
    const φ1 = this.degreeToRadians.degToRad(lat1);
    const φ2 = this.degreeToRadians.degToRad(lat2);
    const Δφ = this.degreeToRadians.degToRad(lat2 - lat1);
    const Δλ = this.degreeToRadians.degToRad(lng2 - lng1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };
}
