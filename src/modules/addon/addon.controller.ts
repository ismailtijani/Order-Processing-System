import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpStatus,
  HttpCode,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponseDto,
} from 'src/shared';

@Controller('addons')
@UseInterceptors(LoggingInterceptor)
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post(Routes.CREATE_ADDON)
  @HttpCode(HttpStatus.CREATED)
  async createAddon(@Body() createAddonDto: CreateAddonDto) {
    const addon = await this.addonService.createAddon(createAddonDto);
    return new SuccessResponseDto(ResponseMessages.ADDON_CREATED, addon);
  }

  @Get(Routes.GET_ADDONS)
  @HttpCode(HttpStatus.OK)
  async getAllAddons(@Query() paginationDto: PaginationDto) {
    const result = await this.addonService.findAll(paginationDto, [
      'mainMeal',
      'addonMeal',
      'category',
    ]);
    return new SuccessResponseDto(
      ResponseMessages.ADDONS_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_ADDON)
  @HttpCode(HttpStatus.OK)
  async getAddonById(@Param('addonId', ParseUUIDPipe) id: string) {
    const addon = await this.addonService.findById(id, [
      'mainMeal',
      'addonMeal',
      'category',
    ]);
    return new SuccessResponseDto(ResponseMessages.ADDON_RETRIEVED, addon);
  }

  @Put(Routes.UPDATE_ADDON)
  @HttpCode(HttpStatus.OK)
  async updateAddon(
    @Param('addonId', ParseUUIDPipe) id: string,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    const addon = await this.addonService.update(id, updateAddonDto);
    return new SuccessResponseDto(ResponseMessages.ADDON_UPDATED, addon);
  }

  @Delete(Routes.DELETE_ADDON)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddon(@Param('addonId', ParseUUIDPipe) id: string) {
    await this.addonService.delete(id);
    return new SuccessResponseDto(ResponseMessages.ADDON_DELETED, null);
  }

  @Get(Routes.GET_ADDONS_BY_MEAL)
  @HttpCode(HttpStatus.OK)
  async getAddonsByMeal(
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    const result = await this.addonService.findByField(
      'meal_id',
      mealId,
      paginationDto,
      ['addonMeal', 'category'],
    );
    return new SuccessResponseDto(
      ResponseMessages.ADDONS_RETRIEVED,
      result.data,
      result.meta,
    );
  }
}
