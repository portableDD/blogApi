import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Get user with a specfic ID',
    example: '1234',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
