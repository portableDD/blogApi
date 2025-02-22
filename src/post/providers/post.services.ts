import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
// import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { UserService } from 'src/users/providers/users.services';
import { TagsService } from 'src/tags/provider/tags.service';
import { PatchPostDto } from '../dto/patch-posts.dto';
import { GetPostsDto } from '../dto/getPost.dto';
import { Pagination } from 'src/common/pagination/provider/pagination';
import { Paginated } from 'src/common/pagination/interfaces/paginatedInterfaces';

@Injectable()
export class PostServices {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    private readonly userService: UserService,

    private readonly tagService: TagsService,

    private readonly paginationService: Pagination,
    // @InjectRepository(MetaOption)
    // private metaRepository: Repository<MetaOption>,
  ) {}

  public async FindAllPosts(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    // const post = await this.postRepository.find({
    //   skip: (postQuery.page - 1) * postQuery.limit,
    //   // take: number of post to show per page
    //   take: postQuery.limit,
    // });
    const post = await this.paginationService.paginatedQuery(
      postQuery,
      this.postRepository,
    );
    return post;
  }

  public async createPosts(createPostDto: CreatePostDto) {
    // find author from database base on author id
    const author = await this.userService.findOneById(createPostDto.authorId);

    // find tag from database
    const tags = await this.tagService.findMultipleTag(createPostDto.tags);

    const post = this.postRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    // // create MetaOptions
    // const metaOption = createPostDto.metaOptions
    //   ? this.metaRepository.create(createPostDto.metaOptions)
    //   : null;

    // if (metaOption) {
    //   await this.metaRepository.save(metaOption);
    // }
    // Create post
    // const post = this.postRepository.create(createPostDto);

    // Add metaOption to the post
    // if (metaOption) {
    //   post.metaOptions = metaOption;
    // }
    // return the post to the user
    return await this.postRepository.save(post);
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    // find the tags
    const tags = await this.tagService.findMultipleTag(patchPostDto.tags);

    // find the post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    // update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.imageUrl = patchPostDto.imageUrl ?? post.imageUrl;
    post.postType = patchPostDto.postType ?? post.postType;
    post.postStatus = patchPostDto.postStatus ?? post.postStatus;

    // assign the new tags
    post.tags = tags;

    // save the post
    return await this.postRepository.save(post);
  }

  public async deleteOne(id: number) {
    // find the post and the metaOptions of the post
    await this.postRepository.delete(id);
    // console.log(post);
    // const inversePost = await this.metaRepository.find({
    //   where: { id: post.metaOptions.id },
    //   relations: { post: true },
    // });
    // console.log(inversePost);

    // delete post
    // await this.postRepository.delete(id);
    // // delete a metaoptions
    // await this.metaRepository.delete(post.metaOptions.id);
    // confirmation
    return { deleted: true, id };
  }
}
