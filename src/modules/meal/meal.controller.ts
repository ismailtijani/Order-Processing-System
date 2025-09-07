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
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponseDto,
} from 'src/shared';

@Controller('meals')
@UseInterceptors(LoggingInterceptor)
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post(Routes.CREATE_MEAL)
  @HttpCode(HttpStatus.CREATED)
  async createMeal(@Body() createMealDto: CreateMealDto) {
    const meal = await this.mealService.createMeal(createMealDto);
    return new SuccessResponseDto(ResponseMessages.MEAL_CREATED, meal);
  }

  @Get(Routes.GET_MEALS)
  @HttpCode(HttpStatus.OK)
  async getAllMeals(
    @Query() paginationDto: PaginationDto,
    @Query() filters?: any,
  ) {
    const result = await this.mealService.findAll(
      paginationDto,
      ['brand', 'category', 'addons'],
      filters, // I will create MealQueryDto to handle filters properly
    );
    return new SuccessResponseDto(
      ResponseMessages.MEALS_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_MEAL)
  @HttpCode(HttpStatus.OK)
  async getMealById(@Param('mealId', ParseUUIDPipe) id: string) {
    const meal = await this.mealService.findById(id, [
      'brand',
      'category',
      'addons.addonMeal',
    ]);
    return new SuccessResponseDto(ResponseMessages.MEAL_RETRIEVED, meal);
  }

  @Put(Routes.UPDATE_MEAL)
  @HttpCode(HttpStatus.OK)
  async updateMeal(
    @Param('mealId', ParseUUIDPipe) id: string,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    const meal = await this.mealService.updateMeal(id, updateMealDto);
    return new SuccessResponseDto(ResponseMessages.MEAL_UPDATED, meal);
  }

  @Delete(Routes.DELETE_MEAL)
  @HttpCode(HttpStatus.OK)
  async deleteMeal(@Param('mealId', ParseUUIDPipe) id: string) {
    await this.mealService.delete(id);
    return new SuccessResponseDto(ResponseMessages.MEAL_DELETED, null);
  }

  @Get(Routes.GET_MEALS_BY_BRAND)
  @HttpCode(HttpStatus.OK)
  async getMealsByBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    const result = await this.mealService.findByField(
      'brand_id',
      brandId,
      paginationDto,
      ['brand', 'addons'],
    );
    return new SuccessResponseDto(
      ResponseMessages.MEALS_RETRIEVED,
      result.data,
      result.meta,
    );
  }
}
