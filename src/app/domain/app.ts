import { Injectable } from '@nestjs/common';
import AppRepository from './app.repository';

@Injectable()
export class App implements AppRepository {
  getHealthCheckMessage(): string {
    return 'Service is Up!';
  }

  getTrackingMessage(): object {
    return {
      message: 'My first tracking',
      location: [0.0, 0.0],
      user_id: '12234',
      ontrip: false,
    };
  }
}
