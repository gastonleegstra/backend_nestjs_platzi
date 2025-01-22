import { PartialType } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class createOrderDto {
  @IsNumber()
  @Min(1)
  readonly customerId: number;
}

export class updateOrderDto extends PartialType(createOrderDto) {}
