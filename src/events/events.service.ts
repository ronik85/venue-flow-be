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
import { UpdateEventDto } from './dto/update-event.dto';
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
      where: { section: { venueId: dto.venueId } },
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
      const saved = await manager.save(event);

      const eventSeats = seats.map((seat) =>
        this.eventSeatRepository.create({
          eventId: saved.id,
          seatId: seat.id,
          price: dto.defaultPrice.toString(),
          status: EventSeatStatus.AVAILABLE,
        }),
      );

      await manager.save(eventSeats);
      return saved;
    });

    return {
      message: 'Event created successfully',
      data: savedEvent,
      generatedSeatsCount: seats.length,
    };
  }

  async listEvents() {
    const events = await this.eventRepository.find({
      relations: { venue: true },
      order: { startTime: 'ASC' },
    });

    return {
      message: 'Events retrieved successfully',
      total: events.length,
      data: events,
    };
  }

  async getEventById(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        venue: true,
        eventSeats: {
          seat: { section: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return {
      message: 'Event retrieved successfully',
      data: event,
    };
  }

  async updateEvent(id: string, dto: UpdateEventDto, organizerId: string) {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    // Authorization — only the original organizer (or admin, handled via guard) may update
    if (event.organizerId !== organizerId) {
      throw new BadRequestException(
        'You are not authorized to update this event',
      );
    }

    if (dto.venueId && dto.venueId !== event.venueId) {
      const venueExists = await this.venueRepository.existsBy({
        id: dto.venueId,
      });
      if (!venueExists) {
        throw new NotFoundException(`Venue with ID ${dto.venueId} not found`);
      }
      // TODO (post-MVP): block venue changes when bookings already exist
      event.venueId = dto.venueId;
    }

    if (dto.title !== undefined) event.title = dto.title;
    if (dto.description !== undefined) event.description = dto.description;
    if (dto.startTime !== undefined) event.startTime = new Date(dto.startTime);
    if (dto.status !== undefined) event.status = dto.status;

    const updatedEvent = await this.eventRepository.save(event);
    return {
      message: 'Event updated successfully',
      data: updatedEvent,
    };
  }
}
