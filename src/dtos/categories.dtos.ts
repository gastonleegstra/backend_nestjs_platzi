import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
export class CategoryDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

}
export class CreateCategoryDto extends PartialType(CategoryDto) {
  @IsDate()
  @IsOptional()
  readonly createAt: Date;

  @IsDate()
  @IsOptional()
  readonly updateAt: Date;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
