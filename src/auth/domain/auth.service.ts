import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  private apiKeys: string[] = [
    this.configService.apikey1,
    this.configService.apikey2,
  ];

  validateApiKey(apiKey: string) {
    return this.apiKeys.find((key) => apiKey === key);
  }
}
