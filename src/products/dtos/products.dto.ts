import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product title' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product description' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Product price' })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Product stock' })
  readonly stock: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({ description: 'Product image' })
  readonly image: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Product brand ID' })
  readonly brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class PaginationProductDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Product filter by min price' })
  @ValidateIf((item) => item.maxPrice)
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Product filter by max price' })
  maxPrice: number;
}
