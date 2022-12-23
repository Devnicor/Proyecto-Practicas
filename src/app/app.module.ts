/* eslint-disable hexagonal-architecture/enforce */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './infrastructure/app.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { HealthCheckInteractor } from './application/health-check.interactor';
import { App } from './domain/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
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
