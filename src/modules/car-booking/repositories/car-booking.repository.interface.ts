import { CarBookingEntity } from '../entities/car-booking.entity';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import {
  CarBookingCountQueryInput,
  CarBookingCountResult,
  CarBookingCreateInput,
  CarBookingQueryInput,
  CarBookingUpdateInput,
} from '../interfaces/car-booking.interface';

export interface ICarBookingRepository {
  create(data: CarBookingCreateInput): Promise<CarBookingEntity>;
  findById(id: string): Promise<CarBookingEntity | null>;
  findByCode(bookingCode: string): Promise<CarBookingEntity | null>;
  findAll(
    query: CarBookingQueryInput,
  ): Promise<PaginatedResultDTO<CarBookingEntity>>;
  update(id: string, data: CarBookingUpdateInput): Promise<CarBookingEntity>;
  getCountByStatus(
    filters?: CarBookingCountQueryInput,
  ): Promise<CarBookingCountResult>;
}
