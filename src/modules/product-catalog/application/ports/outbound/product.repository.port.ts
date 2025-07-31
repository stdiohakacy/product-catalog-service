import { ExceptionBase } from '@libs/exceptions';
import { BaseRepositoryPort } from '@libs/infrastructure/persistence/typeorm/repository/base.repository.port';
import { Product } from '@modules/product-catalog/domain/aggregates/product.aggregate';
import { Option, Result } from 'oxide.ts';

export const PRODUCT_REPOSITORY_PORT = Symbol('PRODUCT_REPOSITORY_PORT');
export interface ProductRepositoryPort extends BaseRepositoryPort<Product> {
  findByName(name: string): Promise<Result<Option<Product>, ExceptionBase>>;
}
