import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

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
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty()
  @IsOptional()
  readonly address: AddressDto;

  @IsDate()
  @IsOptional()
  readonly createAt: Date;

  @IsDate()
  @IsOptional()
  readonly updateAt: Date;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
