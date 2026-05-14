import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtUser } from './interfaces/request-with-user.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    return await this.usersService.create(registerDto);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    if (!email || !pass) {
      throw new ConflictException('Email and password are required');
    }
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{
    access_token: string;
    user: JwtUser;
  }> {
    await this.usersService.updateLastLogin(user.id);
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
