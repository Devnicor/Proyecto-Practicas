import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private apiKeys: string[] = [process.env.API_KEY_1, process.env.API_KEY_2];

  validateApiKey(apiKey: string) {
    return this.apiKeys.find((key) => apiKey === key);
  }
}