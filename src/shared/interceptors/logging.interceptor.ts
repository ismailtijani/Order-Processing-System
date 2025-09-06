import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { SENSITIVE_FIELDS } from '../constants/constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = request;
    const timestamp = new Date().toISOString();

    // Log the request
    this.logger.log(`${method} ${url} - ${timestamp}`, {
      method,
      endpoint: url,
      body: this.sanitizeBody(body),
      timestamp,
    });

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} - ${Date.now() - now}ms`,
            `Response completed in ${Date.now() - now}ms`,
          ),
        ),
      );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };

    SENSITIVE_FIELDS.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });

    return sanitized;
  }
}
