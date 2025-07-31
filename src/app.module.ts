import { ProductCatalogModule } from '@modules/product-catalog/product-catalog.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './modules/product-catalog/infrastructure/persistence/typeorm/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig, autoLoadEntities: true }),
    ProductCatalogModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
