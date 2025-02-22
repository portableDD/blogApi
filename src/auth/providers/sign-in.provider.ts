import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';
import { SigninDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider.ts';

@Injectable()
export class SignInProvider {
  constructor(
    // circular dependency injection
    @Inject(forwardRef(() => UserService))
    private readonly userServices: UserService,

    // intra dependency injection of hash provider
    private readonly hashingProvider: HashingProvider,

    // inter dependency injection of genrate token provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async SignIn(signInDto: SigninDto) {
    // find the user in the database by the email
    // throw an error
    const user = await this.userServices.GetOneByEmail(signInDto.email);
    // compare the password to the hash
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'error connecting to the database',
      });
    }
    // send a confirmation
    if (!isEqual) {
      throw new UnauthorizedException('Email/Password is incorrect');
    }
    const tokens = await this.generateTokensProvider.generateTokens(user);
    return [tokens, user];
  }
}
