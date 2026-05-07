import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { TravelAgencyRepository } from '../repositories/travel-agency.repository';
import { LoggerService } from '../../common/provider/logger.service';
import {
  TravelAgencyResponseDTO,
  CreateTravelAgencyDTO,
  UpdateTravelAgencyDTO,
  TravelAgencyQueryDTO,
} from '../dto';
import { PaginatedResultDTO } from '../../common/models/pagination.model';
import { TravelAgencyEntity } from '../entities/travel-agency.entity';

/**
 * TravelAgency Service
 * Handles business logic and orchestrates repository calls for travel agencies
 */
@Injectable()
export class TravelAgencyService {
  constructor(
    private readonly travelAgencyRepository: TravelAgencyRepository,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Create a new travel agency
   */
  async create(
    createTravelAgencyDto: CreateTravelAgencyDTO,
    userId?: string,
  ): Promise<TravelAgencyResponseDTO> {
    // Check for duplicate agency name
    const existingAgency = await this.travelAgencyRepository.findByName(
      createTravelAgencyDto.name,
    );

    if (existingAgency) {
      throw new ConflictException(
        `Travel agency with name "${createTravelAgencyDto.name}" already exists`,
      );
    }

    // Create the agency
    const travelAgency = await this.travelAgencyRepository.create({
      name: createTravelAgencyDto.name,
      tel: createTravelAgencyDto.tel,
      address: createTravelAgencyDto.address,
      note: createTravelAgencyDto.note,
      createdById: userId,
      updatedById: userId,
    });

    this.logger.info(
      `Travel agency created: ${travelAgency.id} - ${travelAgency.name}`,
    );

    return this.mapToResponseDTO(travelAgency);
  }

  /**
   * Find many travel agencies with pagination and filters
   */
  async findMany(
    query: TravelAgencyQueryDTO,
  ): Promise<PaginatedResultDTO<TravelAgencyResponseDTO>> {
    const result = await this.travelAgencyRepository.findMany(query);

    return {
      data: result.data.map((agency) => this.mapToResponseDTO(agency)),
      meta: result.meta,
    };
  }

  /**
   * Find travel agency by ID
   */
  async findById(id: string): Promise<TravelAgencyResponseDTO> {
    const travelAgency = await this.travelAgencyRepository.findById(id);

    if (!travelAgency) {
      throw new NotFoundException(`Travel agency with ID ${id} not found`);
    }

    return this.mapToResponseDTO(travelAgency);
  }

  /**
   * Update travel agency
   */
  async update(
    id: string,
    updateTravelAgencyDto: UpdateTravelAgencyDTO,
    userId?: string,
  ): Promise<TravelAgencyResponseDTO> {
    // Check if travel agency exists
    const existingAgency = await this.travelAgencyRepository.findById(id);

    if (!existingAgency) {
      throw new NotFoundException(`Travel agency with ID ${id} not found`);
    }

    // Check for duplicate name if name is being updated
    if (
      updateTravelAgencyDto.name &&
      updateTravelAgencyDto.name !== existingAgency.name
    ) {
      const duplicateAgency = await this.travelAgencyRepository.findByName(
        updateTravelAgencyDto.name,
      );

      if (duplicateAgency) {
        throw new ConflictException(
          `Travel agency with name "${updateTravelAgencyDto.name}" already exists`,
        );
      }
    }

    // Update the agency
    const travelAgency = await this.travelAgencyRepository.update(id, {
      ...updateTravelAgencyDto,
      updatedById: userId,
    });

    this.logger.info(`Travel agency updated: ${id}`);

    return this.mapToResponseDTO(travelAgency);
  }

  /**
   * Soft delete travel agency
   */
  async softDelete(id: string): Promise<void> {
    // Check if travel agency exists
    const existingAgency = await this.travelAgencyRepository.findById(id);

    if (!existingAgency) {
      throw new NotFoundException(`Travel agency with ID ${id} not found`);
    }

    await this.travelAgencyRepository.softDelete(id);

    this.logger.info(`Travel agency soft deleted: ${id}`);
  }

  /**
   * Map TravelAgencyEntity to TravelAgencyResponseDTO
   * @private
   */
  private mapToResponseDTO(
    entity: TravelAgencyEntity,
  ): TravelAgencyResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      tel: entity.tel,
      address: entity.address,
      note: entity.note,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
