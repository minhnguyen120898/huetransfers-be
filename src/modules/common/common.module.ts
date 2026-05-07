import { Module } from '@nestjs/common';
import { LogInterceptor } from './interceptors';
import { LoggerService, PrismaService, EmailService } from './provider';
import { ExcelExportService } from './services/excel-export.service';

@Module({
  providers: [
    LoggerService,
    PrismaService,
    EmailService,
    ExcelExportService,
    LogInterceptor,
  ],
  exports: [
    LoggerService,
    PrismaService,
    EmailService,
    ExcelExportService,
    LogInterceptor,
  ],
})
export class CommonModule {}
