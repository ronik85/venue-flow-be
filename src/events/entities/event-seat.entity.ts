import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  VersionColumn,
} from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { EventSeatStatus } from './enums/event-seat-status.enum';
import { Event } from './event.entity';

@Entity({ name: 'event_seats' })
@Index(['eventId', 'status'])
@Index(['eventId', 'seatId'], { unique: true })
export class EventSeat extends BaseEntity {
  @Column({ name: 'event_id', type: 'uuid' })
  eventId: string;

  @ManyToOne(() => Event, (event) => event.eventSeats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'seat_id', type: 'uuid' })
  seatId: string;

  @ManyToOne(() => Seat)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @Column({
    type: 'enum',
    enum: EventSeatStatus,
    default: EventSeatStatus.AVAILABLE,
  })
  status: EventSeatStatus;

  @VersionColumn()
  version: number;
}
