import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HelperService } from 'src/shared/services/helper-service';

@Module({
  controllers: [UserController],
  providers: [UserService, HelperService],
})
export class UserModule {}
