import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { extractMessage } from '../utils/extract-message.util';
import { ErrorResponse } from '../types/error-response.type';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error !!';
    let errors: string[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();
      const extracted = extractMessage(res);

      message = extracted.message;
      errors = extracted.errors;
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (status >= 500) {
      console.error('Error:', {
        path: request.url,
        status,
        exception,
      });
    }

    response.status(status).json(errorResponse);
  }
}
