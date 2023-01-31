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

  @Get('messages')
  getMessages() {
    return {
      Message: 'Hola mundo',
      Date: 'Fecha de hoy ' + new Date().toDateString(),
      Number: Math.floor(Math.random() * 20),
    };
  }
}
