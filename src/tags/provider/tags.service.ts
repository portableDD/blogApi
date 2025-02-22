import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  public async findMultipleTag(tags: number[]) {
    const result = this.tagRepository.find({
      where: { id: In(tags) },
    });

    return result;
  }

  public async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async deleteTag(id: number) {
    await this.tagRepository.delete(id);
    return { delete: true, id };
  }
}
