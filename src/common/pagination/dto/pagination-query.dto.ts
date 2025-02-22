import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 2;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
