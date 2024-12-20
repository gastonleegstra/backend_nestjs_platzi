import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

export class createOrderDto {
  @IsNumber()
  @Min(1)
  readonly customerId: number;

  @IsString()
  readonly status: string;

  @IsNumber({}, { each: true })
  readonly productsIds: number[];
}

export class updateOrderDto extends PartialType(createOrderDto) {}
