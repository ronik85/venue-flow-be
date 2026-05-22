import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import {
  PaginationQueryDto,
  SortOrder,
} from '../../common/dto/pagination-query.dto';
import { EventStatus } from '../entities/enums/event-status.enum';

export class ListEventsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    example: 'Coldplay',
    description: 'Case-insensitive partial match on event title',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: EventStatus,
    description: 'Filter by event status',
  })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Filter by venue UUID',
  })
  @IsOptional()
  @IsUUID('4')
  venueId?: string;

  @ApiPropertyOptional({
    enum: ['startTime', 'createdAt'],
    default: 'startTime',
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsIn(['startTime', 'createdAt'])
  sortBy?: 'startTime' | 'createdAt' = 'startTime';

  // Override base default — events list defaults to ASC (upcoming first)
  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.ASC,
    description: 'Sort direction (default ASC — upcoming events first)',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
