import { Optional } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: 'number', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @ApiPropertyOptional({ type: 'number', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 10;

  offset?: number;
}
