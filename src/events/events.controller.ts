import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtUser } from '../auth/interfaces/request-with-user.interface';
import { UserRole } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new event and auto-generate event seats  [ORGANIZER, ADMIN]' })
  @ApiResponse({ status: 201, description: 'Event created with seats' })
  @ApiResponse({ status: 400, description: 'Venue has no seats configured' })
  @ApiResponse({ status: 404, description: 'Venue not found' })
  async createEvent(
    @CurrentUser() user: JwtUser,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.createEvent(createEventDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all events (public)' })
  @ApiResponse({ status: 200, description: 'Array of events ordered by start time' })
  async listEvents() {
    return this.eventsService.listEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event details including all seats (public)' })
  @ApiParam({ name: 'id', description: 'Event UUID' })
  @ApiResponse({ status: 200, description: 'Event with venue and seat details' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getEventById(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.getEventById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update an event  [ORGANIZER, ADMIN] (organizer must own event)' })
  @ApiParam({ name: 'id', description: 'Event UUID' })
  @ApiResponse({ status: 200, description: 'Event updated' })
  @ApiResponse({ status: 400, description: 'Not authorized or invalid venue' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtUser,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(id, updateEventDto, user.id);
  }
}
