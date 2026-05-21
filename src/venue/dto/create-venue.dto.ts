import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({ example: 'Phoenix Palladium', description: 'Name of the venue' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Mumbai', description: 'City where the venue is located' })
  @IsString()
  city: string;

  @ApiProperty({ example: '462, Senapati Bapat Marg, Lower Parel', description: 'Full street address' })
  @IsString()
  address: string;
}
