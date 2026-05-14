import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { BulkCreateSeatsDto } from './dto/bulk-create-seats.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { VenueService } from './venue.service';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  async findAllVenues() {
    return await this.venueService.findAllVenues();
  }

  @Get(':id')
  async findVenueById(@Param('id') id: string) {
    return await this.venueService.findVenueById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return await this.venueService.createVenue(createVenueDto);
  }

  @Post('sections')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return await this.venueService.createSection(createSectionDto);
  }

  @Post('seats/bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async bulkCreateSeats(@Body() bulkCreateSeatsDto: BulkCreateSeatsDto) {
    return await this.venueService.bulkCreateSeats(bulkCreateSeatsDto);
  }
}
