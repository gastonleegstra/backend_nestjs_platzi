import {IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
