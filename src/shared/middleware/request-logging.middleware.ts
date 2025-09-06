import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SENSITIVE_FIELDS } from '../constants/constants';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, body } = request;
    const timestamp = new Date().toISOString();

    // Log request details
    this.logger.log(`Incoming Request: ${method} ${originalUrl}`, {
      method,
      endpoint: originalUrl,
      body: this.sanitizeBody(body),
      timestamp,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
    });

    // Log response when request completes
    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(`Response: ${method} ${originalUrl} - ${statusCode}`, {
        method,
        endpoint: originalUrl,
        statusCode,
        timestamp: new Date().toISOString(),
      });
    });

    next();
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
