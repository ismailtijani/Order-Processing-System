import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Meal } from './models/meal.model';
import { Brand } from '../brand/models/brand.model';
import { ErrorMessages } from 'src/shared';

@Injectable()
export class MealService extends BaseService<Meal> {
  constructor() {
    super(Meal);
  }

  async createMeal(createMealDto: CreateMealDto): Promise<Meal> {
    const brand = await Brand.query().findById(createMealDto.brand_id);
    if (!brand) {
      throw new BadRequestException(ErrorMessages.BRAND_NOT_FOUND);
    }

    const existingMeal = await this.existsByField('name', createMealDto.name);
    if (existingMeal) {
      throw new BadRequestException(ErrorMessages.MEAL_ALREADY_EXISTS);
    }

    return super.create(createMealDto);
  }

  async updateMeal(id: string, updateMealDto: UpdateMealDto): Promise<Meal> {
    if (updateMealDto.brand_id) {
      const brand = await Brand.query().findById(updateMealDto.brand_id);
      if (!brand) {
        throw new BadRequestException(ErrorMessages.BRAND_NOT_FOUND);
      }
    }

    if (updateMealDto.name) {
      const existingMeal = await this.existsByField(
        'name',
        updateMealDto.name,
        id,
      );
      if (existingMeal) {
        throw new BadRequestException(ErrorMessages.MEAL_ALREADY_EXISTS);
      }
    }

    return super.update(id, updateMealDto);
  }

  async getActiveMealsByBrand(
    brandId: string,
    filters: {
      category?: string;
      itemType?: string;
      priceRange?: { min: number; max: number };
      tags?: string[];
    } = {},
  ) {
    let query = Meal.query()
      .where('brand_id', brandId)
      .where('active', true)
      .where('is_deleted', false)
      .withGraphFetched('[brand, category, addons.addonMeal]');

    if (filters.category) {
      query = query.where('meal_category_id', filters.category);
    }

    if (filters.itemType) {
      query = query.where('item_type', filters.itemType);
    }

    if (filters.priceRange) {
      query = query
        .where('amount', '>=', filters.priceRange.min)
        .where('amount', '<=', filters.priceRange.max);
    }

    if (filters.tags && filters.tags.length > 0) {
      query = query.whereJsonSupersetOf('meal_tags', filters.tags);
    }

    return await query.orderBy('position', 'asc').orderBy('name', 'asc');
  }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.MEAL_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.MEAL_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.MEAL_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.MEAL_NOT_FOUND;
  }
}
