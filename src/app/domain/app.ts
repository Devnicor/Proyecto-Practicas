import { Injectable } from '@nestjs/common';
import AppRepository from './app.repository';

@Injectable()
export class App implements AppRepository {
  getHealthCheckMessage(): string {
    return 'Service is Up!';
  }
}
