import { Module } from '@nestjs/common';
import { TrackingController } from '../tracking/infrastructure/tracking.controller';
import { TrackingService } from '../tracking/application/tracking.service';
import { TrackingInteractor } from './application/tracking.interactor';
import { TrackingIController } from './infrastructure/tracking.interactor.controller';
import { Track } from './domain/tracking';
@Module({
  controllers: [TrackingController, TrackingIController],
  providers: [
    TrackingService,
    TrackingInteractor,
    {
      provide: 'TrackRepository',
      useClass: Track,
    },
  ],
})
export class TrackingModule {}
