import { SetMetadata } from '@nestjs/common';

export const Characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const SALT_ROUNDS = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const SENSITIVE_FIELDS = ['password', 'token', 'authorization'] as const;

export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

export const ORDER_CONSTANTS = {
  MAX_QUANTITY_PER_MEAL: 10,
  MAX_MEALS_PER_ORDER: 50,
  ORDER_CODE_PREFIX: 'ORD',
  ORDER_CODE_LENGTH: 10,
} as const;

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
