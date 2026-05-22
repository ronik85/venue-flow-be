import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../../common/dto/pagination-query.dto';
import { EventSeatStatus } from '../entities/enums/event-seat-status.enum';

/**
 * Query DTO for GET /events/:id/seats.
 * No pagination — seats per event are bounded by the venue capacity,
 * so we always return the full filtered list.
 */
export class ListEventSeatsQueryDto {
  @ApiPropertyOptional({
    enum: EventSeatStatus,
    description: 'Filter by seat availability status',
  })
  @IsOptional()
  @IsEnum(EventSeatStatus)
  status?: EventSeatStatus;

  @ApiPropertyOptional({
    example: 'A',
    description: 'Filter by row label (case-insensitive)',
  })
  @IsOptional()
  @IsString()
  row?: string;

  @ApiPropertyOptional({
    enum: ['row', 'seatNumber'],
    default: 'row',
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsIn(['row', 'seatNumber'])
  sortBy?: 'row' | 'seatNumber' = 'row';

  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.ASC,
    description: 'Sort direction',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
