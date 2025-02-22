import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.services';
import { SigninDto } from '../dto/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly refreshTokensProvider: RefreshTokensProvider,

    // intra dependency injection of Signin provider
    private readonly signInProvider: SignInProvider,
  ) {}

  public async SignIn(signInDto: SigninDto) {
    return await this.signInProvider.SignIn(signInDto);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshToken(refreshTokenDto);
  }
}
