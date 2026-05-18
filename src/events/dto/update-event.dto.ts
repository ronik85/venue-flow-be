import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { EventStatus } from '../entities/enums/event-status.enum';


export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @IsUUID('4')
  @IsOptional()
  venueId?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  defaultPrice?: number;
}
