import { Test, TestingModule } from '@nestjs/testing';
import { App } from '../domain/app';
import { HealthCheckInteractor } from './health-check.interactor';
import { AppMock } from '../domain/app.mock';

describe('HealthCheckInteractor', () => {
  let interactor: HealthCheckInteractor;

  beforeEach(async () => {
    const AppProvider = {
      provide: 'AppRepository',
      useExisting: App,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheckInteractor, AppProvider],
    })
      .overrideProvider('AppRepository')
      .useClass(AppMock)
      .compile();
    interactor = module.get<HealthCheckInteractor>(HealthCheckInteractor);
  });

  describe('run', () => {
    it('should return Service is Up!', async () => {
      const mockResult = {
        data: {
          message: 'Service is Up!',
        },
        fail: {
          error: null,
        },
      };

      expect(await interactor.run()).toEqual(mockResult);
    });
  });
});
