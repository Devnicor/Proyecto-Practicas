import { Injectable } from '@nestjs/common';
import TrackRepository from './tracking.repository';

@Injectable()
export class Track implements TrackRepository {
  getTrackingMessage(): object {
    return {
      message: 'My first tracking',
      location: [0.0, 0.0],
      user_id: '12234',
      ontrip: false,
    };
  }
}
