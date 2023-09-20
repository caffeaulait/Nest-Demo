import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Report } from '../report/report.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'sqlite',
      database: this.configService.get<string>('DB_NAME'),
      entities: [User, Report],
      synchronize: true,
      //   autoLoadEntities: true
    };
  }
}
