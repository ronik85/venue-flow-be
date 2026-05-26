import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSeat } from '../events/entities/event-seat.entity';
import { Event } from '../events/entities/event.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingItem } from './entities/booking-item.entity';
import { Booking } from './entities/booking.entity';
import { BookingExpiryService } from './booking-expiry/booking-expiry.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingItem,
      EventSeat, // Needed to update seat status inside service transactions
      Event, // Needed to validate event existence and status
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingExpiryService],
  exports: [BookingsService], // Exported for potential use by a scheduler module
})
export class BookingsModule {}
