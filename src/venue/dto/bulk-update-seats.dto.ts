import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsUUID } from 'class-validator';

export class BulkUpdateSeatsDto {
  @ApiProperty({
    example: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
    description: 'Array of seat IDs to update',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  seatIds: string[];

  @ApiProperty({ example: true, description: 'Mark seats as wheelchair-accessible' })
  @IsBoolean()
  isAccessible: boolean;
}
