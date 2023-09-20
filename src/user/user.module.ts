import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  //repo is auto created
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    AuthService,
    // {
    //   useClass: CurrentUserInterceptor,
    //   provide: APP_INTERCEPTOR,
    // },
  ],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
