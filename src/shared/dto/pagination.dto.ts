import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PAGINATION_CONSTANTS } from '../constants/constants';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION_CONSTANTS.MIN_LIMIT)
  @Max(PAGINATION_CONSTANTS.MAX_LIMIT)
  //   @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;
}
