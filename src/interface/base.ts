export interface Result<T> {
  code: string | number;
  data: T;
  success: boolean;
  messages: string;
}

export interface Page<T> {
  list: T[];
  total: number;
}

export interface PageParam {
  page?: number;
  pageSize?: number;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
