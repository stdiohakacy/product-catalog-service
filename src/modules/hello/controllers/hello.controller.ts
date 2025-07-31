import { HelperDateService } from '@modules/helper/services/helper.date.service';
import { Response } from '@modules/response/decorators/response.decorator';
import { IResponse } from '@modules/response/interfaces/response.interface';
import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelloDoc } from 'src/modules/hello/docs/hello.doc';
import { HelloResponseDto } from 'src/modules/hello/dtos/response/hello.response.dto';

@ApiTags('modules.hello')
@Controller({ version: VERSION_NEUTRAL, path: '/hello' })
export class HelloController {
  constructor(private readonly helperDateService: HelperDateService) {}

  @HelloDoc()
  @Response('hello.hello', { cached: true })
  @Get('/')
  async hello(): Promise<IResponse<HelloResponseDto>> {
    const today = this.helperDateService.create();

    return {
      data: {
        date: today,
        format: this.helperDateService.formatToIso(today),
        timestamp: this.helperDateService.getTimestamp(today),
      },
    };
  }
}
