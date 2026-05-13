import { Venue } from '../../venue/entities/venue.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
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

  @Column({ name: 'venue_id', type: 'uuid' })
  venueId: string;

  @ManyToOne(() => Venue, (venue) => venue.events)
  @JoinColumn({ name: 'venue_id' }) // it will always be on manytoone side becuase it owns the foreign key
  venue: Venue;

  @OneToMany(() => EventSeat, (eventSeat) => eventSeat.event, { cascade: true })
  eventSeats: EventSeat[];
}
