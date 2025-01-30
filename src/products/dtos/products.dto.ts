import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsOptional()
  @IsUrl()
  readonly image: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
