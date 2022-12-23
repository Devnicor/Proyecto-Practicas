import AppRepository from './app.repository';

export class AppMock implements AppRepository {
  getHealthCheckMessage(): string {
    return 'Service is Up!';
  }
}
