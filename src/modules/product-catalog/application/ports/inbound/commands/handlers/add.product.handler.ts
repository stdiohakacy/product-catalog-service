import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddProductCommand } from '../add.product.command';
import {
  PRODUCT_REPOSITORY_PORT,
  ProductRepositoryPort,
} from '../../../outbound/product.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { Product } from '@modules/product-catalog/domain/aggregates/product.aggregate';
import { ConflictException, ExceptionBase } from '@libs/exceptions';
import { Inject } from '@nestjs/common';
import { ProductCategory } from '@modules/product-catalog/domain/value-objects/product-category.vo';
import { ProductId } from '@modules/product-catalog/domain/value-objects/product-id.vo';

@CommandHandler(AddProductCommand)
export class AddProductHandler
  implements ICommandHandler<AddProductCommand, Result<Product, ExceptionBase>>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY_PORT)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(
    command: AddProductCommand,
  ): Promise<Result<Product, ExceptionBase>> {
    const existed = await this.productRepository.findByName(command.name);
    if (existed.isErr()) return existed;

    if (existed.unwrap().isSome()) {
      return Err(
        new ConflictException(
          `Product with name '${command.name}' already exists.`,
        ),
      );
    }

    const product = Product.create({
      id: ProductId.generate().getValue(),
      props: {
        name: command.name,
        description: command.description,
        imageUrls: command.imageUrls,
        price: command.price,
        availableItemCount: command.availableItemCount,
        category: new ProductCategory(command.category),
      },
    });

    await this.productRepository.insert(product);
    return Ok(product);
  }
}
