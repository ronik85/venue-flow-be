import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '../entities/enums/booking-status.enum';

export class ListBookingsQueryDto {
  @IsOptional()
  @IsEnum(BookingStatus, {
    message: `status must be one of: ${Object.values(BookingStatus).join(', ')}`,
  })
  status?: BookingStatus;
}
