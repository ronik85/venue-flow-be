import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Seat } from '../seats/entities/seat.entity';
import { Venue } from '../venue/entities/venue.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventSeatStatus } from './entities/enums/event-seat-status.enum';
import { EventSeat } from './entities/event-seat.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventSeat)
    private readonly eventSeatRepository: Repository<EventSeat>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    private readonly dataSource: DataSource,
  ) {}

  async createEvent(dto: CreateEventDto, organizerId: string) {
    const venueExists = await this.venueRepository.existsBy({
      id: dto.venueId,
    });
    if (!venueExists) {
      throw new NotFoundException(`Venue with ID ${dto.venueId} not found`);
    }

    const seats = await this.seatRepository.find({
      relations: { section: true },
      where: {
        section: {
          venueId: dto.venueId,
        },
      },
    });

    if (seats.length === 0) {
      throw new BadRequestException(
        'Cannot create an event for a venue with no seats',
      );
    }

    const event = this.eventRepository.create({
      title: dto.title,
      description: dto.description,
      startTime: new Date(dto.startTime),
      venueId: dto.venueId,
      organizerId,
    });

    const savedEvent = await this.dataSource.transaction(async (manager) => {
      const savedEvent = await manager.save(event);

      const eventSeats = seats.map((seat) =>
        this.eventSeatRepository.create({
          eventId: savedEvent.id,
          seatId: seat.id,
          price: dto.defaultPrice.toString(),
          status: EventSeatStatus.AVAILABLE,
        }),
      );

      await manager.save(eventSeats);

      return savedEvent;
    });

    return {
      message: 'Event created successfully',
      data: savedEvent,
      generatedSeatsCount: seats.length,
    };
  }
}
