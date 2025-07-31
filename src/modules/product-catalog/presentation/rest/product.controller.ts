import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddProductCommand } from '../../application/ports/inbound/commands/add.product.command';
import { Result } from 'oxide.ts';
import { Product } from '../../domain/aggregates/product.aggregate';
import { ExceptionBase } from '@libs/exceptions';

@Controller('products')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createProduct(
    @Body()
    body: {
      name: string;
      description: string;
      imageUrls: string[];
      price: number;
      availableItemCount: number;
      category: { name: string; description?: string };
    },
  ): Promise<Product> {
    const command = new AddProductCommand(
      body.name,
      body.description,
      body.imageUrls,
      body.price,
      body.availableItemCount,
      body.category,
    );
    const result: Result<Product, ExceptionBase> =
      await this.commandBus.execute(command);

    if (result.isErr()) {
      const error = result.unwrapErr();
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }

    return result.unwrap();
  }
}
