import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
// import { ConfigService } from '@nestjs/config';
import { ORDER_CONSTANTS, SALT_ROUNDS } from '../constants/constants';

@Injectable()
export class HelperService {
  // constructor(private readonly configService: ConfigService) {}

  async hashData(data: string) {
    return bcrypt.hash(data, SALT_ROUNDS);
  }

  async compareHashedData(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }

  generateOTP() {
    try {
      const bytes = crypto.randomBytes(3);
      return ((bytes.readUIntBE(0, 3) % 900000) + 100000).toString();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error Generating OTP');
    }
  }

  static calculatePercentage(value: number, percentage: number): number {
    return (value * percentage) / 100;
  }

  static calculateTax(amount: number, taxRate: number): number {
    return this.calculatePercentage(amount, taxRate);
  }

  static calculateDeliveryFee(
    distance: number,
    orderAmount: number,
    freeDeliveryThreshold: number = 25000,
  ): number {
    if (orderAmount >= freeDeliveryThreshold) {
      return 0;
    }

    // Base delivery fee
    let deliveryFee = 500;

    // Add distance-based fee
    if (distance > 5) {
      deliveryFee += Math.ceil((distance - 5) / 2) * 100;
    }

    return Math.min(deliveryFee, 2000); // Cap at 2000
  }

  static roundToCurrency(amount: number): number {
    return Math.round(amount * 100) / 100;
  }

  static generateOrderCode(): string {
    const prefix = ORDER_CONSTANTS.ORDER_CODE_PREFIX;
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');

    return `${prefix}${timestamp}${random}`;
  }

  static validateOrderCode(orderCode: string): boolean {
    const pattern = new RegExp(`^${ORDER_CONSTANTS.ORDER_CODE_PREFIX}\\d{9}$`);
    return pattern.test(orderCode);
  }
}
