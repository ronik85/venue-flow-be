import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startTime: string;

  @IsUUID('4')
  venueId: string;

  @IsNumber()
  @Min(0)
  defaultPrice: number;
}
