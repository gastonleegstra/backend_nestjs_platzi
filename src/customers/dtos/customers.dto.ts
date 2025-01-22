import {  IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  readonly zipCode: string;
}

export class CreateCustomerDto {

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  @IsOptional()
  readonly address: AddressDto;

}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
