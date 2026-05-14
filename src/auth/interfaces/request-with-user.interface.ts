import { Request } from 'express';
import { UserRole } from '../../users/entities/user.entity';

export interface JwtUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface RequestWithUser extends Request {
  user: JwtUser;
}
