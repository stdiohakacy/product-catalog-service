import { ProductCatalogModule } from '@modules/product-catalog/product-catalog.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../product-catalog/infrastructure/persistence/typeorm/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerOptionModule } from '@modules/logger/logger.option.module';
import { LoggerOptionService } from '@modules/logger/services/logger.option.service';
import { HelperModule } from '@modules/helper/helper.module';
import { RequestModule } from '@modules/request/request.module';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [LoggerOptionModule],
      inject: [LoggerOptionService],
      useFactory: async (loggerOptionService: LoggerOptionService) => {
        return loggerOptionService.createOptions();
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),

    TypeOrmModule.forRoot({ ...typeormConfig, autoLoadEntities: true }),
    ProductCatalogModule,
    HelperModule.forRoot(),
    RequestModule.forRoot(),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
