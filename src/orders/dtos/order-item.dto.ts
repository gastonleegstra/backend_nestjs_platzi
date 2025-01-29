import { PartialType } from '@nestjs/swagger';
import { IsNumber, Min, IsNotEmpty } from 'class-validator';

export class createOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly idOrder: number;

  @IsNotEmpty()
  @IsNumber()
  readonly idProducto: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly quantity: number;
}

export class updateOrderItemDto extends PartialType(createOrderItemDto) {}
