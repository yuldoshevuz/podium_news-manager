import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { NewsType } from '../enums/news-type.enum';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllNewsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ type: 'number' })
  @IsEnum(NewsType)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  type?: NewsType;
}
