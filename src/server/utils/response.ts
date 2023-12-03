import { safeJsonParse } from '.';

export type HttpStatusCode =
  | 200
  | 201
  | 204
  | 301
  | 303
  | 400
  | 401
  | 403
  | 404
  | 500
  | 502
  | 504;

export const getSuccessResponse = (
  status: HttpStatusCode,
  message?: string,
  data?: any
) => {
  return {
    status,
    type: 'success',
    message,
    data: safeJsonParse(data)
  };
};

export const getErrorResponse = (
  status: HttpStatusCode,
  message?: string,
  data?: any
) => {
  return {
    status,
    type: 'error',
    message,
    data: safeJsonParse(data)
  };
};
