import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationQueryDto } from './pagination-query.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: PaginationQueryDto, metadata: ArgumentMetadata) {
    const { page, limit } = value;

    const offset = (page - 1) * limit;

    return { ...value, page, limit, offset };
  }
}
