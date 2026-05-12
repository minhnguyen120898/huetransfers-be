import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../common/provider/prisma.provider';
import { LoggerService } from '../../common/provider/logger.service';
import { CarBookingRepository } from '../repositories/car-booking.repository';
import { CarBookingEntity } from '../entities/car-booking.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import {
  CarBookingCountResult,
  CarBookingCountQueryInput,
} from '../interfaces/car-booking.interface';
import {
  CreateCarBookingDto,
  UpdateCarBookingDto,
  CarBookingQueryDto,
  CarBookingResponseDto,
  CarBookingCountQueryDto,
  CreateCarTransferBookingDto,
  UpdateCarTransferPricingDto,
  UpdateCarOriginalPricingDto,
  BulkCarPaymentStatusDto,
} from '../dto';
import { CarBookingStatus, PaymentStatus } from 'generated/prisma';

@Injectable()
export class CarBookingService {
  constructor(
    private readonly carBookingRepository: CarBookingRepository,
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  // ============================================================
  // CREATE
  // ============================================================

  /**
   * Create a new car booking.
   * debtAmount = sellingPrice - receivingPrice
   * - Positive: agency owes us (receivable)
   * - Negative: we owe agency (payable/commission)
   * Status defaults to 'confirmed' — car bookings are confirmed on creation.
   */
  async create(
    dto: CreateCarBookingDto,
    userId?: string,
  ): Promise<CarBookingResponseDto> {
    if (dto.travelAgencyId) {
      const agency = await this.prisma.travelAgency.findUnique({
        where: { id: dto.travelAgencyId },
      });
      if (!agency) {
        throw new NotFoundException(
          `Travel agency with ID ${dto.travelAgencyId} not found`,
        );
      }
      if (!agency.isActive) {
        throw new BadRequestException(
          `Travel agency "${agency.name}" is not active`,
        );
      }
    }

    const booking = await this.carBookingRepository.create({
      travelAgencyId: dto.travelAgencyId ?? null,
      vehicleType: dto.vehicleType,
      serviceDate: new Date(dto.serviceDate),
      guestName: dto.guestName,
      guestPhone: dto.guestPhone ?? null,
      guestCount: dto.guestCount,
      pickupLocation: dto.pickupLocation ?? null,
      dropoffLocation: dto.dropoffLocation ?? null,
      vat: dto.vat ?? false,
      sellingPrice: dto.sellingPrice,
      receivingPrice: dto.receivingPrice,
      paymentCollection: dto.paymentCollection,
      paymentCollectionNote: dto.paymentCollectionNote ?? null,
      note: dto.note ?? null,
      routes: dto.routes ?? null,
      createdById: userId ?? null,
      updatedById: userId ?? null,
    });

    this.logger.info(
      `[CarBookingService] Created car booking ${booking.bookingCode} — ` +
        `debtAmount=${booking.debtAmount.toString()} (${booking.sellingPrice.toString()} - ${booking.receivingPrice.toString()})`,
    );

    return this.mapToResponseDto(booking);
  }

  // ============================================================
  // READ
  // ============================================================

  async findAll(
    query: CarBookingQueryDto,
  ): Promise<PaginatedResultDTO<CarBookingResponseDto>> {
    const result = await this.carBookingRepository.findAll(query);
    return {
      data: result.data.map((b) => this.mapToResponseDto(b)),
      meta: result.meta,
    };
  }

  async findOne(id: string): Promise<CarBookingResponseDto> {
    const booking = await this.carBookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundException(`Car booking with ID ${id} not found`);
    }
    return this.mapToResponseDto(booking);
  }

  async findByCode(bookingCode: string): Promise<CarBookingResponseDto> {
    const booking = await this.carBookingRepository.findByCode(bookingCode);
    if (!booking) {
      throw new NotFoundException(
        `Car booking with code ${bookingCode} not found`,
      );
    }
    return this.mapToResponseDto(booking);
  }

  async getCountByStatus(
    filters?: CarBookingCountQueryDto,
  ): Promise<CarBookingCountResult> {
    return this.carBookingRepository.getCountByStatus(
      filters as CarBookingCountQueryInput,
    );
  }

  // ============================================================
  // UPDATE
  // ============================================================

  /**
   * Update car booking with status-based restrictions:
   * - confirmed: all fields editable
   * - completed: only 'note' editable
   * - cancelled / transferred: no updates allowed
   */
  async update(
    id: string,
    dto: UpdateCarBookingDto,
    userId?: string,
  ): Promise<CarBookingResponseDto> {
    const booking = await this.carBookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundException(`Car booking with ID ${id} not found`);
    }

    if (booking.isCancelled() || booking.isTransferred()) {
      throw new BadRequestException(
        `Cannot update a car booking with status "${booking.status}"`,
      );
    }

    if (booking.isCompleted()) {
      // Only note is editable when completed
      const allowedKeys = new Set(['note']);
      const attempted = Object.keys(dto).filter((k) => !allowedKeys.has(k));
      if (attempted.length > 0) {
        throw new BadRequestException(
          `Completed car bookings can only have their note updated. ` +
            `Attempted to update: ${attempted.join(', ')}`,
        );
      }
    }

    if (dto.travelAgencyId) {
      const agency = await this.prisma.travelAgency.findUnique({
        where: { id: dto.travelAgencyId },
      });
      if (!agency) {
        throw new NotFoundException(
          `Travel agency with ID ${dto.travelAgencyId} not found`,
        );
      }
      if (!agency.isActive) {
        throw new BadRequestException(
          `Travel agency "${agency.name}" is not active`,
        );
      }
    }

    const updated = await this.carBookingRepository.update(id, {
      ...dto,
      serviceDate: dto.serviceDate ? new Date(dto.serviceDate) : undefined,
      updatedById: userId ?? null,
    });

    this.logger.info(
      `[CarBookingService] Updated car booking ${updated.bookingCode}`,
    );
    return this.mapToResponseDto(updated);
  }

  // ============================================================
  // CANCEL (soft delete)
  // ============================================================

  /**
   * Cancel a car booking — no operation unlinking needed (no BookingOperation).
   * Only confirmed bookings can be cancelled.
   */
  async remove(id: string, userId?: string): Promise<CarBookingResponseDto> {
    const booking = await this.carBookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundException(`Car booking with ID ${id} not found`);
    }

    if (!booking.canBeCancelled()) {
      throw new BadRequestException(
        `Cannot cancel a car booking with status "${booking.status}". Only confirmed bookings can be cancelled.`,
      );
    }

    const cancelled = await this.carBookingRepository.update(id, {
      status: CarBookingStatus.cancelled,
      updatedById: userId ?? null,
    });

    this.logger.info(
      `[CarBookingService] Cancelled car booking ${cancelled.bookingCode}`,
    );
    return this.mapToResponseDto(cancelled);
  }

  // ============================================================
  // BULK PAYMENT STATUS
  // ============================================================

  async bulkUpdatePaymentStatus(
    dto: BulkCarPaymentStatusDto,
    userId?: string,
  ): Promise<{ count: number }> {
    this.logger.info(
      `[CarBookingService] Bulk updating payment status for ${dto.bookingIds.length} car bookings to ${dto.paymentStatus}`,
    );

    const existingCount = await this.prisma.carBooking.count({
      where: { id: { in: dto.bookingIds } },
    });

    if (existingCount !== dto.bookingIds.length) {
      throw new NotFoundException(
        `Some car booking IDs not found. Expected ${dto.bookingIds.length}, found ${existingCount}`,
      );
    }

    const paidAt =
      dto.paymentStatus === PaymentStatus.completed ? new Date() : null;

    const shouldCompleteStatus = dto.paymentStatus === PaymentStatus.completed;

    const result = await this.prisma.carBooking.updateMany({
      where: { id: { in: dto.bookingIds } },
      data: {
        paymentStatus: dto.paymentStatus,
        paidAt,
        ...(shouldCompleteStatus && {
          status: CarBookingStatus.completed,
        }),
        updatedById: userId ?? null,
        updatedAt: new Date(),
      },
    });

    this.logger.info(
      `[CarBookingService] Updated payment status for ${result.count} car bookings`,
    );
    return { count: result.count };
  }

  // ============================================================
  // TRANSFER
  // ============================================================

  /**
   * Transfer a car booking to a partner agency.
   *
   * FINANCIAL MODEL (same as tour booking transfer):
   * - compensationAmount: What we pay the partner (defaults to sellingPrice)
   * - netCompensation = compensationAmount - receivingPrice (what we actually owe them)
   * - Transfer booking debtAmount = -(netCompensation) → negative = payable
   *
   * Transfer booking is created with:
   * - isTransfer = true (excluded from user-facing lists)
   * - status = confirmed (CarBooking has no in_operation)
   * - debtAmount = negative (represents what we owe the partner)
   */
  async transferToPartnerAgency(
    originalId: string,
    dto: CreateCarTransferBookingDto,
    userId?: string,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    transferBooking: CarBookingResponseDto;
  }> {
    this.logger.info(
      `[CarBookingService] Transferring car booking ${originalId} to agency ${dto.partnerAgencyId}`,
    );

    const original = await this.carBookingRepository.findById(originalId);
    if (!original) {
      throw new NotFoundException(
        `Car booking with ID ${originalId} not found`,
      );
    }

    if (!original.canBeTransferred()) {
      throw new BadRequestException(
        `Cannot transfer car booking with status "${original.status}". ` +
          `Only confirmed non-transfer bookings can be transferred.`,
      );
    }

    if (original.travelAgencyId === dto.partnerAgencyId) {
      throw new BadRequestException(
        'Cannot transfer car booking to the same travel agency',
      );
    }

    const partnerAgency = await this.prisma.travelAgency.findUnique({
      where: { id: dto.partnerAgencyId },
    });
    if (!partnerAgency) {
      throw new NotFoundException(
        `Partner agency with ID ${dto.partnerAgencyId} not found`,
      );
    }
    if (!partnerAgency.isActive) {
      throw new BadRequestException(
        `Partner agency "${partnerAgency.name}" is not active and cannot receive transfers`,
      );
    }

    const compensationAmount =
      dto.compensationAmount !== undefined
        ? new Decimal(dto.compensationAmount)
        : original.sellingPrice;

    const netCompensation = compensationAmount.minus(original.receivingPrice);

    // Build descriptive transfer note
    let transferNote = `[TRANSFER COMPENSATION]\n`;
    transferNote += `Original Agency: ${original.travelAgency?.name || 'N/A'}\n`;
    transferNote += `Original Booking Code: ${original.bookingCode}\n`;
    transferNote += `Reason: ${dto.reason}\n\n`;
    transferNote += `[COMPENSATION DETAILS]\n`;
    transferNote += `Compensation amount: ${compensationAmount.toString()} VND\n`;
    transferNote += `Partner collects from guest: ${original.receivingPrice.toString()} VND\n`;
    transferNote += `We pay partner (net): ${netCompensation.toString()} VND\n`;

    const result = await this.prisma.$transaction(async (tx) => {
      // Mark original as transferred
      const updatedOriginal = await tx.carBooking.update({
        where: { id: originalId },
        data: {
          status: CarBookingStatus.transferred,
          transferredAt: new Date(),
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      // Create compensation booking for partner
      const transferBookingCode = `${original.bookingCode}-TRANSFER`;
      const transferBooking = await tx.carBooking.create({
        data: {
          bookingCode: transferBookingCode,
          travelAgencyId: dto.partnerAgencyId,
          vehicleType: original.vehicleType,
          serviceDate: original.serviceDate,
          guestName: `[TRANSFER] ${original.guestName}`,
          guestPhone: original.guestPhone,
          guestCount: original.guestCount,
          pickupLocation: original.pickupLocation,
          dropoffLocation: original.dropoffLocation,
          vat: original.vat,
          sellingPrice: compensationAmount,
          receivingPrice: original.receivingPrice,
          debtAmount: new Decimal(0).minus(netCompensation), // negative = payable to partner
          paymentCollection: original.paymentCollection,
          status: CarBookingStatus.confirmed, // No in_operation in car booking
          isTransfer: true,
          transferFromId: originalId,
          transferToAgencyId: dto.partnerAgencyId,
          transferReason: dto.reason,
          transferredAt: new Date(),
          note: transferNote,
          createdById: userId ?? null,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      return { updatedOriginal, transferBooking };
    });

    this.logger.info(
      `[CarBookingService] Transfer complete:\n` +
        `  Original: ${original.bookingCode} → transferred\n` +
        `  Transfer: ${result.transferBooking.bookingCode} → debtAmount=${result.transferBooking.debtAmount.toString()} (negative=payable)`,
    );

    return {
      originalBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.updatedOriginal),
      ),
      transferBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.transferBooking),
      ),
    };
  }

  // ============================================================
  // UPDATE TRANSFER PRICING
  // ============================================================

  /**
   * Edit the compensation amount after a transfer has been made.
   * Works on the original booking (must be status=transferred).
   */
  async updateTransferPricing(
    originalId: string,
    dto: UpdateCarTransferPricingDto,
    userId?: string,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    transferBooking: CarBookingResponseDto;
  }> {
    const original = await this.carBookingRepository.findById(originalId);
    if (!original) {
      throw new NotFoundException(
        `Car booking with ID ${originalId} not found`,
      );
    }

    if (!original.isTransferred()) {
      throw new BadRequestException(
        `Car booking ${originalId} has not been transferred (status: ${original.status}). ` +
          'Only transferred bookings can have their transfer pricing updated.',
      );
    }

    const transferBookingData = original.transferBookings?.find(
      (b) => b.isTransfer,
    );
    if (!transferBookingData) {
      throw new NotFoundException(
        `No transfer booking found for car booking ${originalId}`,
      );
    }

    const newCompensationAmount = new Decimal(dto.compensationAmount);
    const receivingPrice = new Decimal(transferBookingData.receivingPrice);
    const newNetCompensation = newCompensationAmount.minus(receivingPrice);
    const newDebtAmount = new Decimal(0).minus(newNetCompensation);

    const pricingNote =
      `\n\n[COMPENSATION UPDATE - ${new Date().toLocaleString('vi-VN')}]\n` +
      `Previous: ${transferBookingData.sellingPrice?.toString() || '0'} VND\n` +
      `New: ${newCompensationAmount.toString()} VND\n` +
      `Net payable to partner: ${newDebtAmount.toString()} VND\n` +
      (dto.reason ? `Reason: ${dto.reason}\n` : '');

    const updatedNote = transferBookingData.note
      ? `${transferBookingData.note}${pricingNote}`
      : pricingNote;

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedTransfer = await tx.carBooking.update({
        where: { id: transferBookingData.id },
        data: {
          sellingPrice: newCompensationAmount,
          debtAmount: newDebtAmount,
          note: updatedNote,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      const freshOriginal = await tx.carBooking.findUnique({
        where: { id: originalId },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      return { updatedTransfer, freshOriginal: freshOriginal! };
    });

    this.logger.info(
      `[CarBookingService] Updated transfer pricing for ${original.bookingCode}: ` +
        `debtAmount=${newDebtAmount.toString()}`,
    );

    return {
      originalBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.freshOriginal),
      ),
      transferBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.updatedTransfer),
      ),
    };
  }

  // ============================================================
  // UPDATE ORIGINAL PRICING (post-transfer)
  // ============================================================

  /**
   * Edit sellingPrice / receivingPrice on a transferred booking.
   * Original debtAmount = sellingPrice - receivingPrice.
   * Transfer booking receivingPrice is synced and its debtAmount recalculated
   * as -(compensationAmount - newReceivingPrice) in the same transaction.
   *
   * Guards:
   *   1. Booking must exist
   *   2. Status must be "transferred"
   *   3. serviceDate must be in the current UTC month
   *   4. paymentStatus must not be "completed"
   */
  async updateOriginalPricing(
    originalId: string,
    dto: UpdateCarOriginalPricingDto,
    userId?: string,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    transferBooking: CarBookingResponseDto;
  }> {
    const original = await this.carBookingRepository.findById(originalId);
    if (!original) {
      throw new NotFoundException(
        `Car booking with ID ${originalId} not found`,
      );
    }

    if (!original.isTransferred()) {
      throw new BadRequestException(
        `Car booking ${originalId} has not been transferred (status: ${original.status}). ` +
          'Only transferred bookings can have their original pricing updated.',
      );
    }

    const now = new Date();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    const serviceMonth = original.serviceDate.getUTCMonth();
    const serviceYear = original.serviceDate.getUTCFullYear();

    if (serviceYear !== currentYear || serviceMonth !== currentMonth) {
      throw new BadRequestException(
        `Cannot update pricing for car booking ${original.bookingCode}. ` +
          `Pricing updates are only allowed in the same month as the service date ` +
          `(${original.serviceDate.toISOString().slice(0, 7)}).`,
      );
    }

    if (original.paymentStatus === PaymentStatus.completed) {
      throw new BadRequestException(
        `Cannot update pricing for car booking ${original.bookingCode}. ` +
          `Payment is already completed.`,
      );
    }

    const transferBookingData = original.transferBookings?.find(
      (b) => b.isTransfer,
    );
    if (!transferBookingData) {
      throw new NotFoundException(
        `No transfer booking found for car booking ${originalId}`,
      );
    }

    if (transferBookingData.paymentStatus === PaymentStatus.completed) {
      throw new BadRequestException(
        `Cannot update pricing for car booking ${original.bookingCode}. ` +
          `The linked compensation booking payment is already completed.`,
      );
    }

    const newSellingPrice = new Decimal(dto.sellingPrice);
    const newReceivingPrice = new Decimal(dto.receivingPrice);
    const newDebtAmount = newSellingPrice.minus(newReceivingPrice);

    // Transfer booking: keep compensation (sellingPrice), sync receivingPrice, recalculate debtAmount
    const transferCompensationAmount = new Decimal(
      transferBookingData.sellingPrice,
    );
    const newTransferDebtAmount = new Decimal(0).minus(
      transferCompensationAmount.minus(newReceivingPrice),
    );

    const pricingNote =
      `\n\n[PRICING UPDATE - ${new Date().toLocaleString('vi-VN')}]\n` +
      `Previous sellingPrice: ${original.sellingPrice.toString()} VND\n` +
      `Previous receivingPrice: ${original.receivingPrice.toString()} VND\n` +
      `New sellingPrice: ${newSellingPrice.toString()} VND\n` +
      `New receivingPrice: ${newReceivingPrice.toString()} VND\n` +
      `New debtAmount: ${newDebtAmount.toString()} VND\n` +
      (dto.reason ? `Reason: ${dto.reason}\n` : '');

    const updatedNote = original.note
      ? `${original.note}${pricingNote}`
      : pricingNote;

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedOriginal = await tx.carBooking.update({
        where: { id: originalId },
        data: {
          sellingPrice: newSellingPrice,
          receivingPrice: newReceivingPrice,
          debtAmount: newDebtAmount,
          note: updatedNote,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      const updatedTransfer = await tx.carBooking.update({
        where: { id: transferBookingData.id },
        data: {
          receivingPrice: newReceivingPrice,
          debtAmount: newTransferDebtAmount,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: true,
        },
      });

      return { updatedOriginal, updatedTransfer };
    });

    this.logger.info(
      `[CarBookingService] Updated original pricing for ${original.bookingCode}: ` +
        `sellingPrice=${newSellingPrice.toString()}, receivingPrice=${newReceivingPrice.toString()}, debtAmount=${newDebtAmount.toString()} | ` +
        `Transfer booking synced: receivingPrice=${newReceivingPrice.toString()}, debtAmount=${newTransferDebtAmount.toString()}`,
    );

    return {
      originalBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.updatedOriginal),
      ),
      transferBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.updatedTransfer),
      ),
    };
  }

  // ============================================================
  // CANCEL TRANSFER
  // ============================================================

  async cancelTransfer(
    originalId: string,
    userId?: string,
  ): Promise<{
    originalBooking: CarBookingResponseDto;
    compensationBooking: CarBookingResponseDto;
  }> {
    this.logger.info(
      `[CarBookingService] Attempting to cancel transfer for car booking ${originalId}`,
    );

    // Guard 1: booking exists
    const original = await this.carBookingRepository.findById(originalId);
    if (!original) {
      throw new NotFoundException(
        `Car booking with ID ${originalId} not found`,
      );
    }

    // Guard 2: must be in transferred status
    if (!original.canTransferBeCancelled()) {
      throw new BadRequestException(
        `Cannot cancel transfer for car booking with status "${original.status}". ` +
          `Only bookings with status "transferred" can have their transfer cancelled.`,
      );
    }

    // Guard 3: serviceDate must be in the current month (UTC)
    const now = new Date();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    const serviceMonth = original.serviceDate.getUTCMonth();
    const serviceYear = original.serviceDate.getUTCFullYear();

    if (serviceYear !== currentYear || serviceMonth !== currentMonth) {
      throw new BadRequestException(
        `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
          `Transfer cancellation is only allowed in the same month as the service date ` +
          `(${original.serviceDate.toISOString().slice(0, 7)}).`,
      );
    }

    // Guard 4: original payment must not be completed
    if (original.paymentStatus === PaymentStatus.completed) {
      throw new BadRequestException(
        `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
          `Original booking payment is already completed.`,
      );
    }

    // Guard 5: compensation booking must exist
    const compensationBooking = original.transferBookings?.find(
      (b) => b.isTransfer,
    );
    if (!compensationBooking) {
      throw new BadRequestException(
        `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
          `No linked compensation booking found — data may be inconsistent.`,
      );
    }

    // Guard 6: compensation payment must not be completed
    if (compensationBooking.paymentStatus === PaymentStatus.completed) {
      throw new BadRequestException(
        `Cannot cancel transfer for car booking ${original.bookingCode}. ` +
          `Compensation booking payment is already completed.`,
      );
    }

    // Transaction: soft-cancel both bookings
    const result = await this.prisma.$transaction(async (tx) => {
      const cancelledOriginal = await tx.carBooking.update({
        where: { id: originalId },
        data: {
          status: CarBookingStatus.cancelled,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: { select: { id: true, name: true, tel: true } },
        },
      });

      const cancelledCompensation = await tx.carBooking.update({
        where: { id: compensationBooking.id },
        data: {
          status: CarBookingStatus.cancelled,
          updatedById: userId ?? null,
        },
        include: {
          travelAgency: {
            select: { id: true, name: true, tel: true, address: true },
          },
          transferBookings: true,
          transferToAgency: { select: { id: true, name: true, tel: true } },
        },
      });

      return { cancelledOriginal, cancelledCompensation };
    });

    this.logger.info(
      `[CarBookingService] Cancelled transfer for car booking ${original.bookingCode} ` +
        `and compensation booking ${compensationBooking.bookingCode}`,
    );

    return {
      originalBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.cancelledOriginal),
      ),
      compensationBooking: this.mapToResponseDto(
        this.mapPrismaToEntity(result.cancelledCompensation),
      ),
    };
  }

  // ============================================================
  // HELPERS
  // ============================================================

  private mapPrismaToEntity(data: any): CarBookingEntity {
    const entity = new CarBookingEntity();
    Object.assign(entity, data);
    return entity;
  }

  private mapToResponseDto(entity: CarBookingEntity): CarBookingResponseDto {
    return {
      id: entity.id,
      bookingCode: entity.bookingCode,
      travelAgencyId: entity.travelAgencyId,
      travelAgency: entity.travelAgency ?? null,
      vehicleType: entity.vehicleType,
      serviceDate: entity.serviceDate,
      guestName: entity.guestName,
      guestPhone: entity.guestPhone,
      guestCount: entity.guestCount,
      pickupLocation: entity.pickupLocation,
      dropoffLocation: entity.dropoffLocation,
      vat: entity.vat,
      sellingPrice: Number(entity.sellingPrice),
      receivingPrice: Number(entity.receivingPrice),
      debtAmount: Number(entity.debtAmount),
      paymentCollection: entity.paymentCollection,
      paymentCollectionNote: entity.paymentCollectionNote,
      paymentStatus: entity.paymentStatus,
      paidAt: entity.paidAt,
      status: entity.status,
      note: entity.note,
      routes: entity.routes,
      isTransfer: entity.isTransfer,
      transferFromId: entity.transferFromId,
      transferToAgencyId: entity.transferToAgencyId,
      transferReason: entity.transferReason,
      transferredAt: entity.transferredAt,
      transferBookings: entity.transferBookings ?? [],
      transferToAgency: entity.transferToAgency ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async getSummary(
    year: number,
    month: number,
  ): Promise<{
    totalSellingPrice: number;
    totalReceivingPrice: number;
    totalDebtAmount: number;
    bookingCount: number;
    filter: { year: number; month: number };
  }> {
    this.logger.info(
      `[CarBookingService] Fetching car booking summary for ${year}-${month}`,
    );

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const agg = await this.prisma.carBooking.aggregate({
      where: {
        isTransfer: false,
        status: { in: ['confirmed', 'completed', 'transferred'] },
        serviceDate: { gte: startDate, lt: endDate },
      },
      _sum: {
        sellingPrice: true,
        receivingPrice: true,
        debtAmount: true,
      },
      _count: { id: true },
    });

    const totalSellingPrice = agg._sum.sellingPrice?.toNumber() ?? 0;
    const totalReceivingPrice = agg._sum.receivingPrice?.toNumber() ?? 0;
    const totalDebtAmount = agg._sum.debtAmount?.toNumber() ?? 0;
    const bookingCount = agg._count.id;

    this.logger.info(
      `[CarBookingService] Car booking summary ${year}-${month}: count=${bookingCount}, ` +
        `selling=${totalSellingPrice}, receiving=${totalReceivingPrice}, debt=${totalDebtAmount}`,
    );

    return {
      totalSellingPrice,
      totalReceivingPrice,
      totalDebtAmount,
      bookingCount,
      filter: { year, month },
    };
  }
}
