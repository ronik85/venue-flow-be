import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity({
  name: 'venue_sections',
})
export class VenueSection extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;
}
