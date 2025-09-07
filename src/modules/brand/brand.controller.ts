import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {
  LoggingInterceptor,
  PaginationDto,
  ResponseMessages,
  Routes,
  SuccessResponse,
} from 'src/shared';
import { Serialize } from 'src/shared/interceptors/response-serializer';
import { BrandResponseDto } from './dto/brand-response.dto';

@Controller('brands')
@Serialize(BrandResponseDto)
@UseInterceptors(LoggingInterceptor)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post(Routes.CREATE_BRAND)
  @HttpCode(HttpStatus.CREATED)
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    const brand = await this.brandService.createBrand(createBrandDto);
    return new SuccessResponse(ResponseMessages.BRAND_CREATED, brand);
  }

  @Get(Routes.GET_BRANDS)
  @HttpCode(HttpStatus.OK)
  async getAllBrands(@Query() paginationDto: PaginationDto) {
    const result = await this.brandService.findAll(paginationDto, ['meals']);
    return new SuccessResponse(
      ResponseMessages.BRANDS_RETRIEVED,
      result.data,
      result.meta,
    );
  }

  @Get(Routes.GET_ONE_BRAND)
  @HttpCode(HttpStatus.OK)
  async getBrandById(@Param('brandId', ParseUUIDPipe) id: string) {
    const brand = await this.brandService.findById(id, ['meals']);
    return new SuccessResponse(ResponseMessages.BRAND_RETRIEVED, brand);
  }

  @Put(Routes.UPDATE_BRAND)
  @HttpCode(HttpStatus.OK)
  async updateBrand(
    @Param('brandId', ParseUUIDPipe) id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const brand = await this.brandService.updateBrand(id, updateBrandDto);
    return new SuccessResponse(ResponseMessages.BRAND_UPDATED, brand);
  }

  @Delete(Routes.DELETE_BRAND)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBrand(@Param('brandId', ParseUUIDPipe) id: string) {
    await this.brandService.delete(id);
    return new SuccessResponse(ResponseMessages.BRAND_DELETED, null);
  }
}
