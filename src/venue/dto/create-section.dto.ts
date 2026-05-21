import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ example: 'Lower Ground A', description: 'Name of the section' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Venue ID this section belongs to' })
  @IsUUID()
  venueId: string;
}
