import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BaseService } from 'src/shared/services/base.service';
import { Brand } from './models/brand.model';
import { ErrorMessages } from 'src/shared';

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor() {
    super(Brand);
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const existingBrand = await this.existsByField('name', createBrandDto.name);
    if (existingBrand) {
      throw new BadRequestException(ErrorMessages.BRAND_ALREADY_EXISTS);
    }

    return super.create(createBrandDto);
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    if (updateBrandDto.name) {
      const existingBrand = await this.existsByField(
        'name',
        updateBrandDto.name,
        id,
      );
      if (existingBrand) {
        throw new BadRequestException(ErrorMessages.BRAND_ALREADY_EXISTS);
      }
    }

    return super.update(id, updateBrandDto);
  }

  protected getCreateErrorMessage(): string {
    return ErrorMessages.BRAND_CREATION_FAILED;
  }

  protected getUpdateErrorMessage(): string {
    return ErrorMessages.BRAND_UPDATE_FAILED;
  }

  protected getDeleteErrorMessage(): string {
    return ErrorMessages.BRAND_DELETION_FAILED;
  }

  protected getNotFoundErrorMessage(): string {
    return ErrorMessages.BRAND_NOT_FOUND;
  }
}
