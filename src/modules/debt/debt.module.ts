import { Module } from '@nestjs/common';
import { CarBookingDebtService } from './services/car-booking-debt.service';
import { CarBookingDebtExcelService } from './services/car-booking-debt-excel.service';
import { CarBookingDebtController } from './controllers/car-booking-debt.controller';
import { DebtExcelController } from './controllers/debt-excel.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CarBookingDebtController, DebtExcelController],
  providers: [CarBookingDebtService, CarBookingDebtExcelService],
  exports: [CarBookingDebtService, CarBookingDebtExcelService],
})
export class DebtModule {}
