import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'Items per page' })
  limit?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @ApiProperty({ description: 'Offset' })
  offset?: number;
}
