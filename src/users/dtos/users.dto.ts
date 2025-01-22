import {IsNotEmpty, IsEmail} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
