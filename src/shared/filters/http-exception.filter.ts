import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorMessages } from '../enums/messages/error-messages.enum';
import { DatabaseErrorCodes } from '../enums/enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ErrorMessages.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    } else if (exception.code) {
      // Handle database errors
      switch (exception.code) {
        case DatabaseErrorCodes.UNIQUE_VIOLATION:
          status = HttpStatus.CONFLICT;
          message = ErrorMessages.DATABASE_DUPLICATE_KEY;
          break;
        case DatabaseErrorCodes.FOREIGN_KEY_VIOLATION:
          status = HttpStatus.BAD_REQUEST;
          message = ErrorMessages.DATABASE_FOREIGN_KEY_VIOLATION;
          break;
        case DatabaseErrorCodes.NOT_NULL_VIOLATION:
          status = HttpStatus.BAD_REQUEST;
          message = ErrorMessages.VALIDATION_ERROR;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = ErrorMessages.DATABASE_ERROR;
      }
    }

    this.logger.error(
      `[${new Date().toISOString()}] ${request.method} ${request.url} - ${status} - ${message}`,
      exception.stack,
    );

    const errorResponse = {
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message : message,
    };

    response.status(status).json(errorResponse);
  }
}
