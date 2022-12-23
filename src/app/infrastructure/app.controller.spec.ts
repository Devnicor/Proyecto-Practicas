import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { App } from '../domain/app';
import { HealthCheckInteractor } from '../application/health-check.interactor';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        HealthCheckInteractor,
        {
          provide: 'AppRepository',
          useClass: App,
        },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Service is Up!"', async () => {
      expect(await appController.getHello()).toBe('Service is Up!');
    });
  });
});
