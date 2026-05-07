import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { TravelAgencyController } from './controller';
import { TravelAgencyService } from './service';
import { TravelAgencyRepository } from './repositories';

/**
 * TravelAgency Module
 * Manages travel agency partner entities with full CRUD operations
 */
@Module({
  imports: [CommonModule],
  controllers: [TravelAgencyController],
  providers: [TravelAgencyService, TravelAgencyRepository],
  exports: [TravelAgencyService],
})
export class TravelAgencyModule {}
