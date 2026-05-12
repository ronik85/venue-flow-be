import { BaseEntity } from '../../../src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

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
}
