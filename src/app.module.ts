import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CommonModule } from './modules/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TravelAgencyModule } from './modules/travel-agency/travel-agency.module';
import { CarBookingModule } from './modules/car-booking/car-booking.module';
import { DebtModule } from './modules/debt/debt.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { ProfitModule } from './modules/profit/profit.module';
import { HealthModule } from './modules/health/health.module';
import { validationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule,
    AuthModule,
    UserModule,
    TravelAgencyModule,
    CarBookingModule,
    DebtModule,
    ExpenseModule,
    ProfitModule,
  ],
})
export class AppModule {}
