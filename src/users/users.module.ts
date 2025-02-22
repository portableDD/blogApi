import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmail } from './providers/find-one-by-email';
import { CreateMany } from './providers/create-many';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindOneByEmail, CreateMany],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule {}
