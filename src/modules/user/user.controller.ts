import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponseDto,
} from 'src/shared';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(Routes.CREATE_USER)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return new SuccessResponseDto(ResponseMessages.USER_CREATED, user);
  }

  @Get(Routes.GET_USERS)
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    const result = await this.userService.findAll(paginationDto);
    return new SuccessResponseDto(
      ResponseMessages.USERS_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_USER)
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('userId', ParseUUIDPipe) id: string) {
    const user = await this.userService.findById(id);
    return new SuccessResponseDto(ResponseMessages.USER_RETRIEVED, user);
  }

  @Put(Routes.UPDATE_USER)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);
    return new SuccessResponseDto(ResponseMessages.USER_UPDATED, user);
  }

  @Delete(Routes.DELETE_USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('userId', ParseUUIDPipe) id: string) {
    await this.userService.delete(id);
    return new SuccessResponseDto(ResponseMessages.USER_DELETED, null);
  }
}
