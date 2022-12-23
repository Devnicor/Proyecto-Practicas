/* eslint-disable hexagonal-architecture/enforce */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './domain/auth.service';
import { ApiKeyStrategy } from './infrastructure/apikey.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
