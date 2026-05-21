import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtUser } from '../auth/interfaces/request-with-user.interface';
import { UserRole } from '../users/entities/user.entity';
import { BookingsService } from './bookings.service';
import { CancelBookingDto } from './dto/cancel-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ListBookingsQueryDto } from './dto/list-bookings-query.dto';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  /**
   * POST /bookings
   * Create a booking — seats are immediately confirmed and marked as BOOKED.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBooking(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(dto, user.id);
  }

  /**
   * GET /bookings/me
   * List the authenticated user's own bookings.
   */
  @Get('me')
  async getMyBookings(@CurrentUser() user: JwtUser) {
    return this.bookingsService.getMyBookings(user.id);
  }

  /**
   * GET /bookings/:id
   * Get a single booking. Owners see their own; ADMIN sees any.
   */
  @Get(':id')
  async getBookingById(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.bookingsService.getBookingById(id, user.id, user.role);
  }

  /**
   * PATCH /bookings/:id/confirm
   * Confirm a PENDING booking — seats transition from LOCKED → BOOKED.
   */
  @Patch(':id/confirm')
  async confirmBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.bookingsService.confirmBooking(id, user.id, user.role);
  }

  /**
   * DELETE /bookings/:id
   * Cancel a booking — seats are released back to AVAILABLE.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async cancelBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtUser,
    @Body() dto: CancelBookingDto,
  ) {
    return this.bookingsService.cancelBooking(id, dto, user.id, user.role);
  }

  // ── Admin routes ───────────────────────────────────────────────────────────

  /**
   * GET /bookings
   * Admin only — list all bookings with optional status filter.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  async adminListBookings(@Query() query: ListBookingsQueryDto) {
    return this.bookingsService.adminListBookings(query);
  }
}
