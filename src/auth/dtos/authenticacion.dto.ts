import {
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class AuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
