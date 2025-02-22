import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneByEmail {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async FindByEmail(email: string) {
    let user: User | undefined;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the User',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
