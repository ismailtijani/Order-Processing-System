import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../dto/success-response.dto.ts';

export interface ClassConstructor<T = any> {
  new (...args: any[]): T;
}

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new ResSerializerInterceptor(dto));
}

export class ResSerializerInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((response) => {
        if (!(response instanceof SuccessResponse)) {
          return this.serializeData(response);
        }

        return new SuccessResponse(
          response.message,
          this.serializeData(response.data),
          response.meta,
        );
      }),
    );
  }

  private serializeData(data: unknown): unknown {
    if (data === undefined || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.transformItem(item));
    }

    return this.transformItem(data);
  }

  private transformItem(item: unknown): T {
    return plainToInstance(this.dto, item, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}
