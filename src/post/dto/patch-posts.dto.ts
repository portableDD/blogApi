import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-posts.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
