import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { PostStatus } from './enums/postStatus.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @Column('varchar')
  title: string;

  @Column({ type: 'enum', enum: PostType, default: PostType.STORY })
  postType: PostType;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  postStatus: PostStatus;

  @Column('varchar')
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn() // Automatically set to the current date when the entity is created
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'timestamp', nullable: true }) // Explicit date column
  publishedDate?: Date;

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOption;

  @ManyToMany(() => Tag, (tags) => tags.post, { eager: true })
  @JoinTable()
  tags: Tag[];
}
