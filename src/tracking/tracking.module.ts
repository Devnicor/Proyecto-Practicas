import { Module } from '@nestjs/common';
import { TrackingController } from './infrastructure/tracking.controller';

@Module({
  controllers: [TrackingController],
})
export class TrackingModule {}
