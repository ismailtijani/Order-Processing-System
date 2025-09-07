import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorMessages } from 'src/shared';
import { BaseService } from 'src/shared/services/base.service';
import { User } from './models/user.model';
import { HelperService } from 'src/shared/services/helper-service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly helperService: HelperService) {
    super(User);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByEmail = await this.existsByField(
      'email',
      createUserDto.email,
    );
    if (existingUserByEmail) {
      throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_EXISTS);
    }

    const existingUserByPhone = await this.existsByField(
      'phone_number',
      createUserDto.phone_number,
    );
    if (existingUserByPhone) {
      throw new BadRequestException(ErrorMessages.PHONE_ALREADY_EXISTS);
    }

    const hashedPassword = await this.helperService.hashData(
      createUserDto.password,
    );

    return super.create({ ...createUserDto, password: hashedPassword });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const existingUser = await this.existsByField(
        'email',
        updateUserDto.email,
        id,
      );
      if (existingUser) {
        throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }
    }

    if (updateUserDto.phone_number) {
      const existingUser = await this.existsByField(
        'phone_number',
        updateUserDto.phone_number,
        id,
      );
      if (existingUser) {
        throw new BadRequestException(ErrorMessages.PHONE_ALREADY_EXISTS);
      }
    }

    return super.update(id, updateUserDto);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return (await User.query().where('email', email).first()) ?? null;
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.helperService.compareHashedData(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.USER_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.USER_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.USER_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.USER_NOT_FOUND;
  }
}
