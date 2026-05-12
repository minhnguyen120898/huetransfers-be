import { Injectable } from '@nestjs/common';
import {
  CarBooking,
  CarBookingStatus,
  Prisma,
  TransportType,
} from 'generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../common/provider/prisma.provider';
import { CarBookingEntity } from '../entities/car-booking.entity';
import { ICarBookingRepository } from './car-booking.repository.interface';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import {
  CarBookingCountQueryInput,
  CarBookingCountResult,
  CarBookingCreateInput,
  CarBookingQueryInput,
  CarBookingUpdateInput,
} from '../interfaces/car-booking.interface';

// Relations to include on every fetch for full context
const CAR_BOOKING_INCLUDE = {
  travelAgency: {
    select: { id: true, name: true, tel: true, address: true },
  },
  transferBookings: {
    select: {
      id: true,
      bookingCode: true,
      status: true,
      paymentStatus: true,
      debtAmount: true,
      sellingPrice: true,
      receivingPrice: true,
      isTransfer: true,
      transferToAgencyId: true,
      transferToAgency: {
        select: { id: true, name: true, tel: true },
      },
    },
  },
  transferToAgency: {
    select: { id: true, name: true, tel: true },
  },
} as const;

@Injectable()
export class CarBookingRepository implements ICarBookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new car booking.
   *
   * debtAmount = sellingPrice - receivingPrice (dual pricing formula)
   * Booking code: CB-YYYYMMDD-{last8ofUUID} — collision-free, no locking needed
   */
  async create(data: CarBookingCreateInput): Promise<CarBookingEntity> {
    const debtAmount = data.sellingPrice - data.receivingPrice;

    // Generate collision-free code using date + UUID suffix
    const bookingCode = await this.generateBookingCode();

    const booking = await this.prisma.carBooking.create({
      data: {
        bookingCode,
        travelAgencyId: data.travelAgencyId ?? null,
        vehicleType: data.vehicleType,
        serviceDate: data.serviceDate,
        guestName: data.guestName,
        guestPhone: data.guestPhone ?? null,
        guestCount: data.guestCount,
        pickupLocation: data.pickupLocation ?? null,
        dropoffLocation: data.dropoffLocation ?? null,
        vat: data.vat ?? false,
        sellingPrice: new Decimal(data.sellingPrice),
        receivingPrice: new Decimal(data.receivingPrice),
        debtAmount: new Decimal(debtAmount),
        paymentCollection: data.paymentCollection,
        paymentCollectionNote: data.paymentCollectionNote ?? null,
        routes: data.routes ?? null,
        note: data.note ?? null,
        createdById: data.createdById ?? null,
        updatedById: data.updatedById ?? null,
        // status defaults to 'confirmed' from schema
        // paymentStatus defaults to 'pending' from schema
      },
      include: CAR_BOOKING_INCLUDE,
    });

    return this.mapToEntity(booking);
  }

  /**
   * Find car booking by ID (includes relations)
   */
  async findById(id: string): Promise<CarBookingEntity | null> {
    const booking = await this.prisma.carBooking.findUnique({
      where: { id },
      include: CAR_BOOKING_INCLUDE,
    });

    return booking ? this.mapToEntity(booking) : null;
  }

  /**
   * Find car booking by booking code
   */
  async findByCode(bookingCode: string): Promise<CarBookingEntity | null> {
    const booking = await this.prisma.carBooking.findUnique({
      where: { bookingCode },
      include: CAR_BOOKING_INCLUDE,
    });

    return booking ? this.mapToEntity(booking) : null;
  }

  /**
   * Find all car bookings with pagination and filters.
   *
   * CRITICAL: Always excludes isTransfer=true — compensation bookings are internal
   * and must never appear in user-facing lists.
   */
  async findAll(
    query: CarBookingQueryInput,
  ): Promise<PaginatedResultDTO<CarBookingEntity>> {
    const {
      page = 1,
      limit = 10,
      search,
      travelAgencyId,
      vehicleType,
      status,
      serviceDateFrom,
      serviceDateTo,
      paymentStatus,
    } = query;
    const skip = (page - 1) * limit;

    // Always exclude transfer compensation bookings from user-facing list
    const where: Prisma.CarBookingWhereInput = {
      isTransfer: false,
    };

    if (travelAgencyId) {
      where.travelAgencyId = travelAgencyId;
    }

    if (vehicleType) {
      where.vehicleType = vehicleType as TransportType;
    }

    if (status) {
      where.status = Array.isArray(status) ? { in: status } : status;
    }

    if (serviceDateFrom || serviceDateTo) {
      where.serviceDate = {
        ...(serviceDateFrom && { gte: new Date(serviceDateFrom) }),
        ...(serviceDateTo && { lte: new Date(serviceDateTo) }),
      };
    }

    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    if (search) {
      where.OR = [
        { bookingCode: { contains: search, mode: 'insensitive' } },
        { guestName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [bookings, total] = await Promise.all([
      this.prisma.carBooking.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ serviceDate: 'desc' }, { createdAt: 'desc' }],
        include: CAR_BOOKING_INCLUDE,
      }),
      this.prisma.carBooking.count({ where }),
    ]);

    return {
      data: bookings.map((b) => this.mapToEntity(b)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update a car booking.
   * Recalculates debtAmount if sellingPrice or receivingPrice changes.
   */
  async update(
    id: string,
    data: CarBookingUpdateInput,
  ): Promise<CarBookingEntity> {
    const updateData: Prisma.CarBookingUncheckedUpdateInput = {};

    if (data.travelAgencyId !== undefined)
      updateData.travelAgencyId = data.travelAgencyId;
    if (data.vehicleType !== undefined)
      updateData.vehicleType = data.vehicleType;
    if (data.serviceDate !== undefined)
      updateData.serviceDate = data.serviceDate;
    if (data.guestName !== undefined) updateData.guestName = data.guestName;
    if (data.guestPhone !== undefined) updateData.guestPhone = data.guestPhone;
    if (data.guestCount !== undefined) updateData.guestCount = data.guestCount;
    if (data.pickupLocation !== undefined)
      updateData.pickupLocation = data.pickupLocation;
    if (data.dropoffLocation !== undefined)
      updateData.dropoffLocation = data.dropoffLocation;
    if (data.vat !== undefined) updateData.vat = data.vat;
    if (data.paymentCollection !== undefined)
      updateData.paymentCollection = data.paymentCollection;
    if (data.paymentCollectionNote !== undefined)
      updateData.paymentCollectionNote = data.paymentCollectionNote;
    if (data.paymentStatus !== undefined)
      updateData.paymentStatus = data.paymentStatus;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.note !== undefined) updateData.note = data.note;
    if (data.routes !== undefined) updateData.routes = data.routes;
    if (data.updatedById) updateData.updatedById = data.updatedById;

    // Recalculate debtAmount if pricing changed
    if (data.sellingPrice !== undefined || data.receivingPrice !== undefined) {
      const current = await this.prisma.carBooking.findUnique({
        where: { id },
        select: { sellingPrice: true, receivingPrice: true },
      });

      const finalSelling =
        data.sellingPrice !== undefined
          ? data.sellingPrice
          : Number(current?.sellingPrice ?? 0);
      const finalReceiving =
        data.receivingPrice !== undefined
          ? data.receivingPrice
          : Number(current?.receivingPrice ?? 0);

      updateData.sellingPrice = new Decimal(finalSelling);
      updateData.receivingPrice = new Decimal(finalReceiving);
      updateData.debtAmount = new Decimal(finalSelling - finalReceiving);
    }

    const booking = await this.prisma.carBooking.update({
      where: { id },
      data: updateData,
      include: CAR_BOOKING_INCLUDE,
    });

    return this.mapToEntity(booking);
  }

  /**
   * Get booking counts by status for badge display.
   *
   * CRITICAL: Always excludes isTransfer=true — compensation bookings
   * must not count towards user-facing badge counts.
   * Only counts 'confirmed' bookings (no pending in CarBooking).
   */
  async getCountByStatus(
    filters?: CarBookingCountQueryInput,
  ): Promise<CarBookingCountResult> {
    const where: Prisma.CarBookingWhereInput = {
      isTransfer: false, // Always exclude transfer compensation bookings
    };

    if (filters?.travelAgencyId) {
      where.travelAgencyId = filters.travelAgencyId;
    }

    if (filters?.serviceDateFrom || filters?.serviceDateTo) {
      where.serviceDate = {
        ...(filters.serviceDateFrom && {
          gte: new Date(filters.serviceDateFrom),
        }),
        ...(filters.serviceDateTo && { lte: new Date(filters.serviceDateTo) }),
      };
    }

    const confirmedCount = await this.prisma.carBooking.count({
      where: { ...where, status: CarBookingStatus.confirmed },
    });

    return {
      confirmedCount,
      totalCount: confirmedCount,
    };
  }

  /**
   * Generate a collision-free booking code.
   * Format: CB-YYYYMMDD-{last8ofUUID}
   * Example: CB-20260220-A3F9B21C
   *
   * Uses UUID suffix instead of sequential number to avoid race conditions.
   */
  private async generateBookingCode(): Promise<string> {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

    // Generate a unique suffix using a DB-side UUID
    const result = await this.prisma.$queryRaw<[{ uuid: string }]>`
      SELECT UPPER(REPLACE(uuid_generate_v4()::text, '-', '')) AS uuid
    `;
    const suffix = result[0].uuid.slice(0, 8); // Take first 8 hex chars

    return `CB-${dateStr}-${suffix}`;
  }

  /**
   * Map Prisma CarBooking model to CarBookingEntity
   */
  private mapToEntity(
    prismaBooking: CarBooking & Record<string, any>,
  ): CarBookingEntity {
    const entity = new CarBookingEntity();
    entity.id = prismaBooking.id;
    entity.bookingCode = prismaBooking.bookingCode;
    entity.travelAgencyId = prismaBooking.travelAgencyId;
    entity.vehicleType = prismaBooking.vehicleType;
    entity.serviceDate = prismaBooking.serviceDate;
    entity.guestName = prismaBooking.guestName;
    entity.guestPhone = prismaBooking.guestPhone;
    entity.guestCount = prismaBooking.guestCount;
    entity.pickupLocation = prismaBooking.pickupLocation;
    entity.dropoffLocation = prismaBooking.dropoffLocation;
    entity.vat = prismaBooking.vat;
    entity.sellingPrice = prismaBooking.sellingPrice;
    entity.receivingPrice = prismaBooking.receivingPrice;
    entity.debtAmount = prismaBooking.debtAmount;
    entity.paymentCollection = prismaBooking.paymentCollection;
    entity.paymentCollectionNote = prismaBooking.paymentCollectionNote;
    entity.paymentStatus = prismaBooking.paymentStatus;
    entity.paidAt = prismaBooking.paidAt;
    entity.status = prismaBooking.status;
    entity.note = prismaBooking.note;
    entity.routes = prismaBooking.routes ?? null;
    entity.isTransfer = prismaBooking.isTransfer;
    entity.transferFromId = prismaBooking.transferFromId;
    entity.transferToAgencyId = prismaBooking.transferToAgencyId;
    entity.transferReason = prismaBooking.transferReason;
    entity.transferredAt = prismaBooking.transferredAt;
    entity.createdAt = prismaBooking.createdAt;
    entity.updatedAt = prismaBooking.updatedAt;
    entity.createdById = prismaBooking.createdById;
    entity.updatedById = prismaBooking.updatedById;
    entity.travelAgency = prismaBooking.travelAgency ?? null;
    entity.transferBookings = prismaBooking.transferBookings ?? [];
    entity.transferToAgency = prismaBooking.transferToAgency ?? null;
    return entity;
  }
}
