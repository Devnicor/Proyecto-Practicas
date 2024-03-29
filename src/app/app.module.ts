import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './infrastructure/app.controller';
import { AuthModule } from '../auth/auth.module';
import { TrackingModule } from '../tracking/tracking.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { HealthCheckInteractor } from './application/health-check.interactor';
import { App } from './domain/app';
import config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        API_KEY_1: Joi.string().required(),
        API_KEY_2: Joi.string().required(),
      }),
    }),
    AuthModule,
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [
    HealthCheckInteractor,
    {
      provide: 'AppRepository',
      useClass: App,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('health').forRoutes('');
  }
}
