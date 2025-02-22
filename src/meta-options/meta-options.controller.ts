import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './provider/meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaService: MetaOptionsService) {}

  @Post()
  public createMetaOptions(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaService.createMeta(createPostMetaOptionsDto);
  }
}
