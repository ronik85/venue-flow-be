import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Event } from '../../events/entities/event.entity';
import { VenueSection } from './venue-section.entity';

@Entity({
  name: 'venues',
})
export class Venue extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => Event, (event) => event.venue)
  events: Event[];

  @OneToMany(() => VenueSection, (venueSection) => venueSection.venue)
  sections: VenueSection[];
}
