import { IFileRows } from '@modules/file/interfaces/file.interface';
import { ENUM_HELPER_FILE_EXCEL_TYPE } from '@modules/helper/enums/helper.enum';
import { HttpStatus } from '@nestjs/common';

export interface IResponseCustomProperty {
  statusCode?: number;
  message?: string;
  httpStatus?: HttpStatus;
}

// metadata
export interface IResponseMetadata {
  customProperty?: IResponseCustomProperty;
  [key: string]: any;
}

// decorator options
export interface IResponseOptions {
  cached?: IResponseCacheOptions | boolean;
}

export interface IResponseFileExcelOptions {
  type?: ENUM_HELPER_FILE_EXCEL_TYPE;
}

// response
export interface IResponse<T = void> {
  _metadata?: IResponseMetadata;
  data?: T;
}

// response pagination
export interface IResponsePagingPagination {
  totalPage: number;
  total: number;
}

export interface IResponsePaging<T> {
  _metadata?: IResponseMetadata;
  _pagination: IResponsePagingPagination;
  data: T[];
}

export interface IResponseFileExcel {
  data: IFileRows[];
}

// cached
export interface IResponseCacheOptions {
  key?: string;
  ttl?: number;
}
