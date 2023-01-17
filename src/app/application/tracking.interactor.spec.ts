import { Test, TestingModule } from '@nestjs/testing';
import { App } from '../domain/app';
import { TrackingInteractor } from './tracking.interactor';
import { AppMock } from '../domain/app.mock';

describe('HealthCheckInteractor', () => {
  let tinteractor: TrackingInteractor;

  beforeEach(async () => {
    const AppProvider = {
      provide: 'AppRepository',
      useExisting: App,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingInteractor, AppProvider],
    })
      .overrideProvider('AppRepository')
      .useClass(AppMock)
      .compile();
    tinteractor = module.get<TrackingInteractor>(TrackingInteractor);
  });

  describe('run', () => {
    it('should return Service is Up!', async () => {
      const mockResult = {
        data: {
          message: 'My first tracking',
          location: [0.0, 0.0],
          user_id: '12234',
          ontrip: false,
        },
        fail: {
          error: null,
        },
      };

      expect(await tinteractor.run()).toEqual(mockResult);
    });
  });
});
