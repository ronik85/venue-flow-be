import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from '../seats/entities/seat.entity';
import { BulkCreateSeatsDto } from './dto/bulk-create-seats.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { VenueSection } from './entities/venue-section.entity';
import { Venue } from './entities/venue.entity';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(VenueSection)
    private readonly sectionRepository: Repository<VenueSection>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async createVenue(dto: CreateVenueDto) {
    const venue = this.venueRepository.create(dto);
    return await this.venueRepository.save(venue);
  }

  async findAllVenues() {
    return await this.venueRepository.find({
      relations: ['sections'],
    });
  }

  async findVenueById(id: string) {
    const venue = await this.venueRepository.findOne({
      where: { id },
      relations: ['sections', 'sections.seats'],
    });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }
    return venue;
  }

  async createSection(dto: CreateSectionDto) {
    const venueExists = await this.venueRepository.existsBy({
      id: dto.venueId,
    });
    if (!venueExists) {
      throw new NotFoundException(`Venue with ID ${dto.venueId} not found`);
    }
    const section = this.sectionRepository.create(dto);
    return await this.sectionRepository.save(section);
  }

  async bulkCreateSeats(dto: BulkCreateSeatsDto) {
    const sectionExists = await this.sectionRepository.existsBy({
      id: dto.sectionId,
    });
    if (!sectionExists) {
      throw new NotFoundException(
        `Venue section with ID ${dto.sectionId} not found`,
      );
    }

    const seats: Seat[] = [];
    for (const row of dto.rows) {
      for (let i = 1; i <= dto.seatsPerRow; i++) {
        seats.push(
          this.seatRepository.create({
            row,
            seatNumber: String(i),
            sectionId: dto.sectionId,
          }),
        );
      }
    }

    return await this.seatRepository.save(seats);
  }
}
