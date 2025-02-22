import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dto/create-post-meta-options.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is title of the blog',
    example: 'Amebo people plenty die',
  })
  @IsString()
  @MinLength(2)
  title: string;

  @IsNotEmpty()
  @IsInt()
  authorId: number;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values: post, story, page, series',
    example: 'post',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: 'Possible values: draft, publish,  review, schedule ',
    example: 'draft',
  })
  @IsEnum(PostStatus)
  postStatus: PostStatus;

  @ApiProperty({
    description: 'This is content of the blog',
    example: 'they will be carrying fake news up and down',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'this is the image url',
    example: 'http://localhost:3000/',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiPropertyOptional({
    description: 'This is the date of publication',
    example: '12/13/2000',
  })
  @IsDate()
  @IsISO8601()
  @IsOptional()
  publishedDate: Date;

  @ApiPropertyOptional({
    description: 'arrays of id of tag',
    example: [1, 2],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tags: number[];

  // @ApiPropertyOptional({
  //     type: 'object',
  //     required: false,
  //     items: {
  //       type: 'object',
  //       properties: {
  //         metavalue: {
  //           type: 'json',
  //           description: 'The metaValue is a JSON string',
  //           example: '{"sidebarEnabled": true,}',
  //         },
  //       },
  //     },
  //   })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
