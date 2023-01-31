import { Test, TestingModule } from '@nestjs/testing';
import { TrackingIController } from './tracking.interactor.controller';
import { Track } from '../domain/tracking';
import { TrackingInteractor } from '../application/tracking.interactor';

describe('TrackingIController', () => {
  let trackingIController: TrackingIController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingIController],
      providers: [
        TrackingInteractor,
        {
          provide: 'TrackRepository',
          useClass: Track,
        },
      ],
    }).compile();
    trackingIController = app.get<TrackingIController>(TrackingIController);
  });

  describe('root', () => {
    it('should return "Service is Up!"', async () => {
      expect(await trackingIController.getTrack()).toBe({
        message: 'My first tracking',
        location: [0.0, 0.0],
        user_id: '12234',
        ontrip: false,
      });
    });
  });
});
