import { InjectRepository } from '@nestjs/typeorm';
import { Result, Option, Ok, Some, None, Err } from 'oxide.ts';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryImpl } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.impl';
import { ProductRepositoryPort } from '@modules/product-catalog/application/ports/outbound/product.repository.port';
import {
  Product,
  ProductProps,
} from '@modules/product-catalog/domain/aggregates/product.aggregate';
import { PRODUCT_SCHEMA } from '../schema/product.schema';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductEntity } from '../typeorm/entities/product.entity';
import {
  ArgumentNotProvidedException,
  ExceptionBase,
  RepositoryException,
} from '@libs/exceptions';

@Injectable()
export class ProductRepositoryAdapter
  extends BaseRepositoryImpl<ProductProps, Product, ProductEntity>
  implements ProductRepositoryPort
{
  constructor(
    @InjectRepository(ProductEntity)
    public readonly productRepository: Repository<ProductEntity>,
    public readonly productMapper: ProductMapper,
  ) {
    super(productRepository, PRODUCT_SCHEMA, productMapper);
  }
  async findByName(
    name: string,
  ): Promise<Result<Option<Product>, ExceptionBase>> {
    if (!name) {
      return Err(new ArgumentNotProvidedException('Product name is required'));
    }
    try {
      const entity = await this.productRepository.findOne({ where: { name } });
      return Ok(entity ? Some(this.mapper.toDomain(entity)) : None);
    } catch (error) {
      return Err(
        new RepositoryException(
          `Failed to find product by name: ${error.message}`,
        ),
      );
    }
  }
}
