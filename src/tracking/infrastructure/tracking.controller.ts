import { Controller, Get, Post } from '@nestjs/common';
import { TrackingService } from '../application/tracking.service';

@Controller()
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('proyect')
  async track() {
    const tracking = this.trackingService.postData();
    return {
      message: 'tracking',
    };
  }

  @Get('proyect/tracking')
  result() {
    console.log('hola');
  }

  @Post('proyect/tracking')
  endpoint() {
    console.log('checked');
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
