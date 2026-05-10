import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * CarBooking Domain Entity
 *
 * Represents a car rental booking with dual pricing model:
 * - sellingPrice: What we charge the agency
 * - receivingPrice: What we collect from the guest
 * - debtAmount: Always calculated = sellingPrice - receivingPrice
 *
 * Key differences from tour Booking:
 * - No tour relation
 * - No operation step — status: confirmed → completed / cancelled / transferred
 * - Default status is confirmed (created directly as confirmed)
 * - Transfer compensation bookings created with status=confirmed, isTransfer=true
 */
export class CarBookingEntity {
  id: string;
  bookingCode: string;
  travelAgencyId: string | null;
  vehicleType: TransportType;
  serviceDate: Date;
  guestName: string;
  guestPhone: string | null;
  guestCount: number;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  vat: boolean;
  sellingPrice: Decimal;
  receivingPrice: Decimal;
  debtAmount: Decimal; // Always non-null: sellingPrice - receivingPrice
  paymentCollection: PaymentCollection;
  paymentCollectionNote: string | null;
  paymentStatus: PaymentStatus;
  paidAt: Date | null;
  status: CarBookingStatus;
  note: string | null;
  routes: string | null;

  // Transfer tracking
  isTransfer: boolean;
  transferFromId: string | null;
  transferToAgencyId: string | null;
  transferReason: string | null;
  transferredAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  updatedById: string | null;

  // Optional relations
  travelAgency?: any;
  transferBookings?: any[];
  transferToAgency?: any;

  // ============================================================
  // Business logic helpers
  // ============================================================

  isConfirmed(): boolean {
    return this.status === CarBookingStatus.confirmed;
  }

  isCompleted(): boolean {
    return this.status === CarBookingStatus.completed;
  }

  isCancelled(): boolean {
    return this.status === CarBookingStatus.cancelled;
  }

  isTransferred(): boolean {
    return this.status === CarBookingStatus.transferred;
  }

  /**
   * Can be updated — confirmed allows full edits, completed allows only note
   */
  canBeUpdated(): boolean {
    return (
      this.status === CarBookingStatus.confirmed ||
      this.status === CarBookingStatus.completed
    );
  }

  /**
   * Can be cancelled — confirmed only
   */
  canBeCancelled(): boolean {
    return this.status === CarBookingStatus.confirmed;
  }

  /**
   * Can be transferred — confirmed only, and must not already be a transfer booking
   */
  canBeTransferred(): boolean {
    return this.status === CarBookingStatus.confirmed && !this.isTransfer;
  }

  canTransferBeCancelled(): boolean {
    return this.status === CarBookingStatus.transferred;
  }

  /**
   * Debt amount as number for calculations
   */
  getDebtAmountAsNumber(): number {
    return Number(this.debtAmount);
  }
}
