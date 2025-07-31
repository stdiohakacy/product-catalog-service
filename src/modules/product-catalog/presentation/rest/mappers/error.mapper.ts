import { ExceptionBase, INTERNAL_SERVER_ERROR } from '@libs/exceptions';
import { ProductAlreadyExistsError } from '@modules/product-catalog/domain/entities/product.error';
import { PRODUCT_ALREADY_EXISTS } from '@modules/product-catalog/domain/errors/product-catalog.error';
import {
  HttpException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

type RestExceptionHandler = (error: ExceptionBase) => HttpException;

function buildHttpErrorBody(
  error: ExceptionBase,
  code: string,
): Record<string, any> {
  return {
    message: error.message,
    errorCode: code,
  };
}

export class DomainToRestErrorMapper {
  private static readonly errorMap = new Map<Function, RestExceptionHandler>([
    [
      ProductAlreadyExistsError,
      (error) => {
        const body = buildHttpErrorBody(error, PRODUCT_ALREADY_EXISTS);
        return new ConflictException(body);
      },
    ],
  ]);

  static map(error: Error): HttpException {
    for (const [ErrorClass, handler] of this.errorMap.entries()) {
      if (error instanceof ErrorClass) {
        return handler(error as ExceptionBase);
      }
    }

    const fallbackBody = {
      message: error.message || 'Internal server error',
      errorCode: INTERNAL_SERVER_ERROR,
    };

    return new InternalServerErrorException(fallbackBody);
  }
}
