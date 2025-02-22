import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from '../dto/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaRepository: Repository<MetaOption>,
  ) {}

  public async createMeta(createPostMetaOption: CreatePostMetaOptionsDto) {
    const metaOptions = this.metaRepository.create(createPostMetaOption);

    return await this.metaRepository.save(metaOptions);
  }
}
