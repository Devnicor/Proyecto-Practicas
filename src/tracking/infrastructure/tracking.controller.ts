import { Controller, Get } from '@nestjs/common';
import { TrackingService } from '../application/tracking.service';

@Controller('controller')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('tracking')
  track() {
    const tracking = this.trackingService.Service();
    return tracking;
  }
}
