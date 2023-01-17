import { TrackingService } from './tracking.service';
import { ConfigType } from '@nestjs/config';
import config from '.../../config';

describe('Tracking', () => {
  it('should be defined', () => {
    expect(TrackingService).toBeDefined();
  });
});
