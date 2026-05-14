import { IsString, IsUUID } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  name: string;

  @IsUUID()
  venueId: string;
}
