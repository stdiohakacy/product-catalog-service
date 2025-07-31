import { ProductCatalogModule } from '@modules/product-catalog/product-catalog.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../product-catalog/infrastructure/persistence/typeorm/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from 'src/configs';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerOptionModule } from '@modules/logger/logger.option.module';
import { LoggerOptionService } from '@modules/logger/services/logger.option.service';
import { HelperModule } from '@modules/helper/helper.module';
import { RequestModule } from '@modules/request/request.module';
import { HelloModule } from '@modules/hello/hello.module';
import { CacheModule, CacheOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig, autoLoadEntities: true }),
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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheOptions> => ({
        max: configService.get<number>('redis.cached.max'),
        ttl: configService.get<number>('redis.cached.ttl'),
        stores: [
          new KeyvRedis({
            socket: {
              host: configService.get<string>('redis.cached.host'),
              port: configService.get<number>('redis.cached.port'),
              tls: configService.get<boolean>('redis.cached.tls'),
            },
            username: configService.get<string>('redis.cached.username'),
            password: configService.get<string>('redis.cached.password'),
          }),
        ],
      }),
      inject: [ConfigService],
    }),

    HelperModule.forRoot(),
    RequestModule.forRoot(),
    ProductCatalogModule,
    HelloModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
