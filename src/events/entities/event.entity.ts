import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Venue } from '../../venue/entities/venue.entity';
import { EventStatus } from './enums/event-status.enum';
import { EventSeat } from './event-seat.entity';

@Entity({
  name: 'events',
})
export class Event extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'start_time', type: 'timestamptz' })
  startTime: Date;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @Column({ name: 'venue_id', type: 'uuid' })
  venueId: string;

  @ManyToOne(() => Venue, (venue) => venue.events)
  @JoinColumn({ name: 'venue_id' }) // it will always be on ManyToOne side becuase it owns the foreign key
  venue: Venue;

  @Column({ name: 'organizer_id', type: 'uuid' })
  organizerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @OneToMany(() => EventSeat, (eventSeat) => eventSeat.event, {
    cascade: ['insert'],
  })
  eventSeats: EventSeat[];
}
