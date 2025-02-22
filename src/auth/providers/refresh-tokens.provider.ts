import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/users.services';
import { GenerateTokensProvider } from './generate-tokens.provider.ts';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userServices: UserService,
    // jwt service
    private readonly jwtService: JwtService,

    // jwt config injcetion
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    // inter dependency injection of genrate token provider
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      // valiadate the refresh token using jwtservice
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );
      // grab the user from the database
      const user = await this.userServices.findOneById(sub);
      // generate the token

      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
