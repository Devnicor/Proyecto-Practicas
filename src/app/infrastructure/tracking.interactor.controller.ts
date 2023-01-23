import { Controller, Get, Post } from '@nestjs/common';
import { TrackingInteractor } from '../application/tracking.interactor';

@Controller()
export class TrackingIController {
  constructor(private readonly tinteractor: TrackingInteractor) {}

  @Get('track/test')
  async getTrack(): Promise<string> {
    const data = await this.tinteractor.run();
    return data.data.message;
  }
}
