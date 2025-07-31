import {
  Doc,
  DocRequest,
  DocResponse,
} from 'src/common/doc/decorators/doc.decorator';
import { ENUM_DOC_REQUEST_BODY_TYPE } from 'src/common/doc/enums/doc.enum';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.request.dto';
import { ProductResponseDto } from '../dtos/product.response.dto';

export function CreateProductDoc(): MethodDecorator {
  return applyDecorators(
    Doc({ summary: 'create a product' }),
    DocRequest({
      bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON,
      dto: CreateProductDto,
    }),
    DocResponse<ProductResponseDto>('product.create', {
      httpStatus: HttpStatus.CREATED,
      dto: ProductResponseDto,
    }),
  );
}
