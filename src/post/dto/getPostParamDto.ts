import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
