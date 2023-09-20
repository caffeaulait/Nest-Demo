import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UserModule,
    ReportModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {
    console.log(`current env is: ${process.env.NODE_ENV}`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['randomkey'],
        }),
      )
      .forRoutes('*');
  }
}
