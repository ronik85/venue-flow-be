import { IsArray, IsInt, IsUUID, Min } from 'class-validator';

export class BulkCreateSeatsDto {
  @IsUUID()
  sectionId: string;

  @IsArray()
  rows: string[];

  @IsInt()
  @Min(1)
  seatsPerRow: number;
}
