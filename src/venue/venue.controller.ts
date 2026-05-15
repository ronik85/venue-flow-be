import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { BulkCreateSeatsDto } from './dto/bulk-create-seats.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { BulkUpdateSeatsDto } from './dto/bulk-update-seats.dto';
import { VenueService } from './venue.service';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) { }

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async updateVenue(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return await this.venueService.updateVenue(id, updateVenueDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async deleteVenue(@Param('id') id: string) {
    return await this.venueService.deleteVenue(id);
  }

  @Patch('sections/:sectionId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async updateSection(@Param('sectionId') sectionId: string, @Body() updateSectionDto: UpdateSectionDto) {
    return await this.venueService.updateSection(sectionId, updateSectionDto);
  }

  @Delete('sections/:sectionId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async deleteSection(@Param('sectionId') sectionId: string) {
    return await this.venueService.deleteSection(sectionId);
  }

  @Patch('seats/bulk')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  async bulkUpdateSeats(@Body() bulkUpdateSeatsDto: BulkUpdateSeatsDto) {
    return await this.venueService.bulkUpdateSeats(bulkUpdateSeatsDto);
  }
}
