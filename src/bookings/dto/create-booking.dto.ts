import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID('4', { message: 'eventId must be a valid UUID v4' })
  eventId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one seat must be selected' })
  @ArrayMaxSize(10, { message: 'Cannot book more than 10 seats at once' })
  @ArrayUnique({ message: 'Duplicate seat IDs are not allowed' })
  @IsUUID('4', { each: true, message: 'Each seatId must be a valid UUID v4' })
  @Type(() => String)
  eventSeatIds: string[];
}
