import { Module } from '@nestjs/common';
import { TrackingController } from '../tracking/infrastructure/tracking.controller';
import { TrackingService } from '../tracking/application/tracking.service';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
