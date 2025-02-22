import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(26)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(26)
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  // @MinLength(3)
  // @MaxLength(26)
  email: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(8)'
  // @MaxLength(26)
  @IsStrongPassword()
  @Matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, {
    message:
      'password must contain at least a uppercase, a special character, a number and it must be between 8 to 16 character ',
  })
  password: string;
}
