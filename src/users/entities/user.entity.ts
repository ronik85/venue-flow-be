import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
}

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column({
    name: 'password_hash',
    select: false,
  })
  passwordHash: string;

  @Column({
    name: 'is_email_verified',
    default: false,
  })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    name: 'last_login_at',
    nullable: true,
  })
  lastLoginAt?: Date;
}
