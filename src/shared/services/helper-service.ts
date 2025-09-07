import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
// import { ConfigService } from '@nestjs/config';
import { SALT_ROUNDS } from '../constants/constants';

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
}
