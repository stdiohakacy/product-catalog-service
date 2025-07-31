import {
  Doc,
  DocAuth,
  DocResponse,
} from 'src/common/doc/decorators/doc.decorator';
import { applyDecorators } from '@nestjs/common';

import { HelloResponseDto } from 'src/modules/hello/dtos/response/hello.response.dto';

export function HelloDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      summary: 'hello test api',
    }),
    DocResponse<HelloResponseDto>('hello.hello', {
      dto: HelloResponseDto,
    }),
  );
}
