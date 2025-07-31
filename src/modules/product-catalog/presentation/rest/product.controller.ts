import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddProductCommand } from '../../application/ports/inbound/commands/add.product.command';
import { match, Result } from 'oxide.ts';
import { Product } from '../../domain/aggregates/product.aggregate';
import { ExceptionBase } from '@libs/exceptions';
import { CreateProductDto } from './dtos/create-product.request.dto';
import { ProductResponseMapper } from './mappers/product-response.mapper';
import { DomainToRestErrorMapper } from './mappers/error.mapper';

@Controller('products')
export class ProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const command = new AddProductCommand({ ...body });

    const result: Result<Product, ExceptionBase> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (product: Product) => {
        return ProductResponseMapper.toResponse(product);
      },
      Err: (error: Error) => {
        throw DomainToRestErrorMapper.map(error);
      },
    });
  }
}
