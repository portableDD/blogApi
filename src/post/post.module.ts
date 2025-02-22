import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostServices } from './providers/post.services';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostServices],
  exports: [TypeOrmModule],
})
export class PostModule {}
