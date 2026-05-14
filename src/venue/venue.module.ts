import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from '../seats/entities/seat.entity';
import { VenueSection } from './entities/venue-section.entity';
import { Venue } from './entities/venue.entity';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Venue, VenueSection, Seat])],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
