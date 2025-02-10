import {IsNotEmpty, IsOptional, IsString,IsEmail} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
