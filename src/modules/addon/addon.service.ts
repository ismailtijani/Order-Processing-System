import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Addon } from './models/addon.model';
import { ErrorMessages } from 'src/shared';
import { Meal } from '../meal/models/meal.model';
import { AddonCategory } from '../addon-category.model';

@Injectable()
export class AddonService extends BaseService<Addon> {
  constructor() {
    super(Addon);
  }

  async createAddon(createAddonDto: CreateAddonDto): Promise<Addon> {
    // Validate main meal exists
    const mainMeal = await Meal.query().findById(createAddonDto.meal_id);
    if (!mainMeal || !mainMeal.active) {
      throw new BadRequestException(ErrorMessages.MEAL_NOT_FOUND);
    }

    // Validate addon meal exists
    const addonMeal = await Meal.query().findById(createAddonDto.addon_meal_id);
    if (!addonMeal || !addonMeal.active) {
      throw new BadRequestException(ErrorMessages.MEAL_NOT_FOUND);
    }

    // Validate addon category exists
    const category = await AddonCategory.query().findById(
      createAddonDto.addon_category_id,
    );
    if (!category) {
      throw new BadRequestException(ErrorMessages.ADDON_CATEGORY_NOT_FOUND);
    }

    return super.create(createAddonDto);
  }

  // async getAddonsByMealGrouped(mealId: string) {
  //   const addons = await Addon.query()
  //     .where('meal_id', mealId)
  //     .withGraphFetched('[addonMeal, category]')
  //     .orderBy('position', 'asc');

  //   // Group by category
  //   const grouped = addons.reduce((acc, addon) => {
  //     const categoryId = addon.addon_category_id;
  //     if (!acc[categoryId]) {
  //       acc[categoryId] = {
  //         category: addon.category,
  //         addons: [],
  //       };
  //     }
  //     acc[categoryId].addons.push(addon);
  //     return acc;
  //   }, {});

  //   return Object.values(grouped);
  // }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.ADDON_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.ADDON_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.ADDON_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.ADDON_NOT_FOUND;
  }
}
