import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Venue } from './venue.entity';

@Entity({
  name: 'venue_sections',
})
export class VenueSection extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'venue_id', type: 'uuid' })
  venueId: string;

  @ManyToOne(() => Venue, (venue) => venue.sections)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(() => Seat, (seat) => seat.section)
  seats: Seat[];
}
