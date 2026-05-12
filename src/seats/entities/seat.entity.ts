import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

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
}
