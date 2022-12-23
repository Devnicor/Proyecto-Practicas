import { Controller, Get } from '@nestjs/common';
// import { AppService } from '../domain/app.service';
import { HealthCheckInteractor } from '../application/health-check.interactor';

@Controller()
export class AppController {
  constructor(private readonly interactor: HealthCheckInteractor) {}

  @Get('health')
  async getHello(): Promise<string> {
    const data = await this.interactor.run();
    return data.data.message;
  }
}
