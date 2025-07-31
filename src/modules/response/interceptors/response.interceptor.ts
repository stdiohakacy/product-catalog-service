import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseDto, ResponseMetadataDto } from '../dtos/response.dto';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { HelperDateService } from '@modules/helper/services/helper.date.service';
import { map, Observable } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IRequestApp } from '@modules/request/interfaces/request.interface';
import { RESPONSE_MESSAGE_PATH_META_KEY } from '../constants/response.constant';
import { IResponse } from '../interfaces/response.interface';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor<Promise<ResponseDto>>
{
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Promise<ResponseDto>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (res: Promise<any>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const response: Response = ctx.getResponse();
          const request: IRequestApp<any> = ctx.getRequest<IRequestApp<any>>();

          let messagePath: string = this.reflector.get<string>(
            RESPONSE_MESSAGE_PATH_META_KEY,
            context.getHandler(),
          );
          // set default response
          let httpStatus: HttpStatus = response.statusCode;
          let statusCode: number = response.statusCode;
          let data: Record<string, any> = undefined;

          // metadata
          const today = this.helperDateService.create();
          const xPath = request.path;
          const xTimestamp = this.helperDateService.getTimestamp(today);
          const xTimezone = this.helperDateService.getZone(today);
          const xRepoVersion = this.configService.get<string>('app.version');
          let metadata: ResponseMetadataDto = {
            timestamp: xTimestamp,
            timezone: xTimezone,
            path: xPath,
            repoVersion: xRepoVersion,
          };

          // response
          const responseData = (await res) as IResponse<any>;

          if (responseData) {
            const { _metadata } = responseData;

            data = responseData.data;
            httpStatus = _metadata?.customProperty?.httpStatus ?? httpStatus;
            statusCode = _metadata?.customProperty?.statusCode ?? statusCode;
            messagePath = _metadata?.customProperty?.message ?? messagePath;

            delete _metadata?.customProperty;

            metadata = {
              ...metadata,
              ..._metadata,
            };
          }

          response.setHeader('x-timestamp', xTimestamp);
          response.setHeader('x-timezone', xTimezone);
          response.setHeader('x-repo-version', xRepoVersion);
          response.status(httpStatus);

          return {
            statusCode,
            message: messagePath,
            _metadata: metadata,
            data,
          };
        }),
      );
    }

    return next.handle();
  }
}
