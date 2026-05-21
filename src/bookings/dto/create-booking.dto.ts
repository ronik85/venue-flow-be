import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Event ID to book seats for' })
  @IsUUID('4', { message: 'eventId must be a valid UUID v4' })
  eventId: string;

  @ApiProperty({
    example: ['b1c2d3e4-f5a6-7890-bcde-f01234567890'],
    description: 'Array of EventSeat IDs (1–10 seats)',
    type: [String],
    minItems: 1,
    maxItems: 10,
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one seat must be selected' })
  @ArrayMaxSize(10, { message: 'Cannot book more than 10 seats at once' })
  @ArrayUnique({ message: 'Duplicate seat IDs are not allowed' })
  @IsUUID('4', { each: true, message: 'Each seatId must be a valid UUID v4' })
  @Type(() => String)
  eventSeatIds: string[];
}
