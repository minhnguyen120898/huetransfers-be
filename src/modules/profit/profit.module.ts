import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { ExpenseModule } from '../expense/expense.module';
import { CarProfitController } from './controllers/car-profit.controller';
import { CarProfitService } from './services/car-profit.service';

@Module({
  imports: [CommonModule, ExpenseModule],
  controllers: [CarProfitController],
  providers: [CarProfitService],
  exports: [CarProfitService],
})
export class ProfitModule {}
