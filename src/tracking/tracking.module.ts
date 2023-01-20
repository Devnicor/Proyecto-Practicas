import { Module } from '@nestjs/common';
import { TrackingController } from './infrastructure/tracking.controller';
import { TrackingService } from './application/tracking.service';

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
