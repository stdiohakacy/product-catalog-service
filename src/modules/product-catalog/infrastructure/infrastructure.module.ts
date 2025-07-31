import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMapper } from './persistence/mappers/product.mapper';
import { ProductRepositoryAdapter } from './persistence/repository/product.repository.adapter';
import { PRODUCT_REPOSITORY_PORT } from '../application/ports/outbound/product.repository.port';
import { ProductEntity } from './persistence/typeorm/entities/product.entity';

const providers = [
  ProductMapper,
  {
    provide: PRODUCT_REPOSITORY_PORT,
    useClass: ProductRepositoryAdapter,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers,
  exports: [...providers],
})
export class InfrastructureModule {}
