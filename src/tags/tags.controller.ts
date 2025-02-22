import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TagsService } from './provider/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public createTags(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Delete()
  public deleteTags(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.deleteTag(id);
  }
}
