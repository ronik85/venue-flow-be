import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'venue_flow',
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtUser) {
    const user: JwtUser = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    return user;
  }
}
