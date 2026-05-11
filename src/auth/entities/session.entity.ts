import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  // A securely generated random token stored in an HTTP-only cookie
  @Column({ unique: true })
  token: string;

  // Track metadata to show the user their "Active Devices" dashboard
  @Column({ name: 'device_info', nullable: true })
  deviceInfo?: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress?: string;

  // Allows manual revocation (e.g., user clicks "Log out of all devices")
  @Column({ name: 'is_revoked', default: false })
  isRevoked: boolean;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  // Establishing the relationship back to your User table
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
