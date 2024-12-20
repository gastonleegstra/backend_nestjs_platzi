import { IsOptional, IsDate,IsNotEmpty, IsNumber, IsString, IsUrl, IsPositive } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import e from "express";
export class ProductDto {
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
}

export class CreateProductDto extends PartialType(ProductDto) {
  @IsDate()
  @IsOptional()
  readonly createAt: Date;

  @IsDate()
  @IsOptional()
  readonly updateAt: Date;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}
