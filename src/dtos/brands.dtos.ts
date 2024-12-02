import { IsNotEmpty, IsOptional, IsDate, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @IsOptional()
  readonly createAt: Date;

  @IsDate()
  @IsOptional()
  readonly updateAt: Date;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
