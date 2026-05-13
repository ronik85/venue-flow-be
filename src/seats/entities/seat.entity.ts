import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { EventSeat } from '../../events/entities/event-seat.entity';
import { VenueSection } from '../../venue/entities/venue-section.entity';

@Entity({
  name: 'seats',
})
export class Seat extends BaseEntity {
  @Column({ type: 'varchar', length: 10 })
  row: string;

  @Column({ name: 'seat_number', type: 'varchar', length: 10 })
  seatNumber: string;

  @Column({ name: 'is_accessible', default: false })
  isAccessible: boolean;

  @Column({ name: 'section_id', type: 'uuid' })
  sectionId: string;

  @ManyToOne(() => VenueSection, (venueSection) => venueSection.seats, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'section_id' })
  section: VenueSection;

  @OneToMany(() => EventSeat, (eventSeat) => eventSeat.seat)
  eventSeats: EventSeat[];
}
