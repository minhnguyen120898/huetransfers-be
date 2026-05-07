import {
  CarBookingStatus,
  PaymentCollection,
  PaymentStatus,
  TransportType,
} from 'generated/prisma';
import { PaginationQueryDTO } from '../../common/models/pagination.model';

export interface CarBookingCreateInput {
  travelAgencyId?: string | null;
  vehicleType: TransportType;
  serviceDate: Date;
  guestName: string;
  guestPhone?: string | null;
  guestCount: number;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  vat?: boolean;
  sellingPrice: number;
  receivingPrice: number;
  paymentCollection: PaymentCollection;
  paymentCollectionNote?: string | null;
  note?: string | null;
  routes?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
}

export interface CarBookingUpdateInput {
  travelAgencyId?: string | null;
  vehicleType?: TransportType;
  serviceDate?: Date;
  guestName?: string;
  guestPhone?: string | null;
  guestCount?: number;
  pickupLocation?: string | null;
  dropoffLocation?: string | null;
  vat?: boolean;
  sellingPrice?: number;
  receivingPrice?: number;
  paymentCollection?: PaymentCollection;
  paymentCollectionNote?: string | null;
  paymentStatus?: PaymentStatus;
  status?: CarBookingStatus;
  note?: string | null;
  routes?: string | null;
  updatedById?: string | null;
}

export interface CarBookingQueryInput extends PaginationQueryDTO {
  search?: string;
  travelAgencyId?: string;
  vehicleType?: TransportType;
  status?: CarBookingStatus | CarBookingStatus[];
  serviceDateFrom?: string;
  serviceDateTo?: string;
  paymentStatus?: PaymentStatus;
}

export interface CarBookingCountQueryInput {
  travelAgencyId?: string;
  serviceDateFrom?: string;
  serviceDateTo?: string;
}

export interface CarBookingCountResult {
  confirmedCount: number;
  totalCount: number;
}
