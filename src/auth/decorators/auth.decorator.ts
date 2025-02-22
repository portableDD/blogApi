import { AUTH_TYPE_KEY } from '../constant/auth-constant';
import { AuthType } from '../enums/auth-type.enums';
import { SetMetadata } from '@nestjs/common';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
