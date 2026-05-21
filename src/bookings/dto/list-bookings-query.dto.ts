import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/enums/booking-status.enum';

export class ListBookingsQueryDto {
  @ApiPropertyOptional({ enum: BookingStatus, description: 'Filter by booking status' })
  @IsOptional()
  @IsEnum(BookingStatus, {
    message: `status must be one of: ${Object.values(BookingStatus).join(', ')}`,
  })
  status?: BookingStatus;
}
