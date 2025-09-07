export class SuccessResponseDto<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;

  constructor(message: string, data: T, meta?: any) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
