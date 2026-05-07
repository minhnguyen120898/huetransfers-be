import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { CarBookingController } from './controller/car-booking.controller';
import { CarBookingService } from './service/car-booking.service';
import { CarBookingRepository } from './repositories/car-booking.repository';

/**
 * Car Booking Module
 *
 * Manages car rental bookings with dual pricing model:
 * - sellingPrice: What we charge the travel agency
 * - receivingPrice: What we collect from the guest directly
 * - debtAmount: sellingPrice - receivingPrice (always non-null)
 *
 * Key Features:
 * - CRUD operations for car bookings
 * - Status flow: confirmed → completed / cancelled / transferred
 * - Transfer compensation bookings (isTransfer=true) hidden from user-facing lists
 * - Bulk payment status updates
 * - Collision-free booking codes: CB-YYYYMMDD-{uuid8}
 */
@Module({
  imports: [CommonModule],
  controllers: [CarBookingController],
  providers: [CarBookingService, CarBookingRepository],
  exports: [CarBookingService],
})
export class CarBookingModule {}
