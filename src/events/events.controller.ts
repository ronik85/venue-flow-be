import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async createEvent(
    @CurrentUser() user: RequestWithUser,
    @Body() createEventDto: CreateEventDto,
  ) {
    const organizerId = user.user.id;
    return await this.eventsService.createEvent(createEventDto, organizerId);
  }
}
