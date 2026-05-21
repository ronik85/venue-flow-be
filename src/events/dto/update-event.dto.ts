import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { EventStatus } from '../entities/enums/event-status.enum';

export class UpdateEventDto {
  @ApiPropertyOptional({ example: 'Coldplay World Tour 2026 — Extended' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description for the event.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2026-12-31T20:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional({ enum: EventStatus, example: EventStatus.PUBLISHED })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @ApiPropertyOptional({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsUUID('4')
  @IsOptional()
  venueId?: string;

  @ApiPropertyOptional({ example: 2000, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  defaultPrice?: number;
}
