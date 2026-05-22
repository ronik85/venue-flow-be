import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  PaginationQueryDto
} from '../../common/dto/pagination-query.dto';

export class ListVenuesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    example: 'Madison',
    description: 'Case-insensitive partial match on venue name or city',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['name', 'createdAt'],
    default: 'createdAt',
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsIn(['name', 'createdAt'])
  sortBy?: 'name' | 'createdAt' = 'createdAt';
}
