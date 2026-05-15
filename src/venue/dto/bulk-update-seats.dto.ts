import { IsArray, IsBoolean, IsUUID } from 'class-validator';

export class BulkUpdateSeatsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  seatIds: string[];

  @IsBoolean()
  isAccessible: boolean;
}
