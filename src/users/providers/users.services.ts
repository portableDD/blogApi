/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUser-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByEmail } from './find-one-by-email';
import { CreateMany } from './create-many';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UserService {
  constructor(
    // User repository injection
    @InjectRepository(User)
    private userRepository: Repository<User>,

    // create User Provider intra dependency injection
    private readonly createUserProvider: CreateUserProvider,

    // find one by email intra dependency injection
    private readonly findOneByEmail: FindOneByEmail,

    // AuthService circular dependency injection
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly createManyService: CreateMany,
  ) {}

  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  public async createUsers(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUsers(createUserDto);
  }

  public async GetOneByEmail(email: string) {
    return await this.findOneByEmail.FindByEmail(email);
  }

  public async deleteUser() {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'error:User have been removed.',
      },
      HttpStatus.MOVED_PERMANENTLY,
    );
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.createManyService.manyUsers(createManyUsersDto);
  }
}
