import { Controller, Get } from '@nestjs/common';
import { TrackingService } from '../application/tracking.service';

@Controller()
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('proyect')
  track() {
    const tracking = this.trackingService.PostData();
    return tracking;
  }
}
