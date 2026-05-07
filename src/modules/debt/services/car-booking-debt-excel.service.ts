import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { ExcelExportService } from 'src/modules/common/services/excel-export.service';
import { LoggerService } from 'src/modules/common';
import { CarBookingDebtDetailReport } from './car-booking-debt.service';

/**
 * Car Booking Debt Excel Export Service
 *
 * Generates Excel files for car booking debt reports (agency receivables).
 * Isolated from the tour booking debt system.
 *
 * FILE FORMAT:
 * - Row 1: Title — "CÔNG NỢ XE: [Month] [Year] - [Agency Name]"
 * - Row 2: Column headers (Vietnamese)
 * - Row 3+: Booking data rows
 * - Row N: "Tổng cộng" summary row (A–H merged, SUM for I/J/K)
 * - Row N+1: Empty spacing row
 * - Row N+2: Dư nợ đầu kỳ (opening debt) — columns J–K, blue styling
 * - Row N+3: Dư nợ cuối kỳ (closing debt) — columns J–K, green styling, formula
 *
 * COLUMNS (A–L):
 *   A: STT | B: Ngày | C: Tên khách | D: Loại xe | E: Lộ trình
 *   F: Điểm đón | G: Điểm trả | H: Số khách
 *   I: Giá bán | J: Thu hộ | K: Công nợ (formula I-J) | L: Ghi chú
 */
@Injectable()
export class CarBookingDebtExcelService {
  constructor(
    private readonly excelService: ExcelExportService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Generate Excel buffer for a car booking debt detail report.
   *
   * @param report - Car booking debt detail report (from CarBookingDebtService)
   * @returns Excel file as Buffer
   */
  async generateCarBookingDebtExcel(
    report: CarBookingDebtDetailReport,
  ): Promise<Buffer> {
    try {
      this.logger.info(
        `[CarBookingDebtExcelService] Generating Excel for agency: ${report.agency.agency.name}, ` +
          `period: ${report.year}-${String(report.month).padStart(2, '0')}`,
      );

      const workbook = this.excelService.createWorkbook();
      const monthName = this.getMonthName(report.month);
      const title = `CÔNG NỢ XE: ${monthName} ${report.year} - ${report.agency.agency.name}`;

      const worksheet = this.excelService.addWorksheetWithTitle(
        workbook,
        'Car Debt Report',
        title,
      );

      // 12 columns: A–L
      this.excelService.defineColumns(worksheet, [
        { header: 'STT', key: 'stt', width: 8 },
        { header: 'Ngày', key: 'serviceDate', width: 14 },
        { header: 'Tên khách', key: 'guestName', width: 22 },
        { header: 'Loại xe', key: 'vehicleType', width: 12 },
        { header: 'Lộ trình', key: 'routes', width: 30 },
        { header: 'Điểm đón', key: 'pickupLocation', width: 25 },
        { header: 'Điểm trả', key: 'dropoffLocation', width: 25 },
        { header: 'Số khách', key: 'guestCount', width: 10 },
        { header: 'Giá bán', key: 'sellingPrice', width: 18 },
        { header: 'Thu hộ', key: 'receivingPrice', width: 18 },
        { header: 'Công nợ', key: 'debtAmount', width: 18 },
        { header: 'Ghi chú', key: 'note', width: 30 },
      ]);

      this.excelService.styleTitleRow(worksheet, title);
      this.excelService.styleHeaderRow(worksheet);

      // Data rows start at row 3 (row 1 = title, row 2 = headers)
      const dataStartRow = 3;

      const dataRows = report.agency.bookings.map((booking, index) => ({
        stt: index + 1,
        serviceDate: booking.serviceDate,
        guestName: booking.guestName,
        vehicleType: this.mapVehicleType(booking.vehicleType),
        routes: booking.routes ?? '',
        pickupLocation: booking.pickupLocation ?? '',
        dropoffLocation: booking.dropoffLocation ?? '',
        guestCount: booking.guestCount,
        sellingPrice: parseFloat(booking.sellingPrice.toString()),
        receivingPrice: parseFloat(booking.receivingPrice.toString()),
        debtAmount: parseFloat(booking.debtAmount.toString()), // overwritten with formula below
        note: booking.note ?? '',
      }));

      this.excelService.addDataRows(worksheet, dataRows);

      // Replace Công nợ cells (column K) with Excel formula: =I{row}-J{row}
      dataRows.forEach((_, index) => {
        const rowNum = dataStartRow + index;
        const debtCell = worksheet.getCell(`K${rowNum}`);
        debtCell.value = { formula: `I${rowNum}-J${rowNum}` };
        debtCell.numFmt = '#,##0';
      });

      // Summary row
      const summaryRowNumber = dataStartRow + dataRows.length;
      const summaryData = {
        stt: 'Tổng cộng',
        serviceDate: '',
        guestName: '',
        vehicleType: '',
        routes: '',
        pickupLocation: '',
        dropoffLocation: '',
        guestCount: '',
        sellingPrice: '',
        receivingPrice: '',
        debtAmount: '',
        note: '',
      };
      this.excelService.addSummaryRow(worksheet, summaryData, 1);

      // Merge A–H for "Tổng cộng" label
      worksheet.mergeCells(`A${summaryRowNumber}:H${summaryRowNumber}`);
      const mergedCell = worksheet.getCell(`A${summaryRowNumber}`);
      mergedCell.value = 'Tổng cộng';
      mergedCell.alignment = { vertical: 'middle', horizontal: 'center' };

      // SUM formulas for I, J, K
      const lastDataRow = summaryRowNumber - 1;

      const sellingTotalCell = worksheet.getCell(`I${summaryRowNumber}`);
      sellingTotalCell.value = {
        formula: `SUM(I${dataStartRow}:I${lastDataRow})`,
      };
      sellingTotalCell.numFmt = '#,##0';

      const receivingTotalCell = worksheet.getCell(`J${summaryRowNumber}`);
      receivingTotalCell.value = {
        formula: `SUM(J${dataStartRow}:J${lastDataRow})`,
      };
      receivingTotalCell.numFmt = '#,##0';

      const debtTotalCell = worksheet.getCell(`K${summaryRowNumber}`);
      debtTotalCell.value = {
        formula: `SUM(K${dataStartRow}:K${lastDataRow})`,
      };
      debtTotalCell.numFmt = '#,##0';

      // Spacing row
      worksheet.addRow({});

      // Debt summary table — columns J (col 10) and K (col 11)
      const previousMonthDebt = parseFloat(
        (report.agency.summary.previousMonthDebt || new Decimal(0)).toString(),
      );
      const openingDebtRowNumber = summaryRowNumber + 2;

      // Opening debt row (Dư nợ đầu kỳ) — blue styling
      const openingDebtRow = worksheet.addRow({});
      openingDebtRow.getCell(10).value = 'Dư nợ đầu kỳ';
      openingDebtRow.getCell(11).value = previousMonthDebt;

      openingDebtRow.getCell(10).alignment = {
        horizontal: 'left',
        vertical: 'middle',
      };
      openingDebtRow.getCell(10).font = {
        bold: true,
        size: 16,
        color: { argb: 'FF0000FF' },
      };
      openingDebtRow.getCell(10).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F4FD' },
      };

      openingDebtRow.getCell(11).alignment = {
        horizontal: 'right',
        vertical: 'middle',
      };
      openingDebtRow.getCell(11).font = {
        bold: true,
        size: 16,
        color: { argb: 'FF0000FF' },
      };
      openingDebtRow.getCell(11).numFmt = '#,##0';
      openingDebtRow.getCell(11).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F4FD' },
      };
      openingDebtRow.height = 30;

      // Closing debt row (Dư nợ cuối kỳ) — green styling, live formula
      const closingDebtRow = worksheet.addRow({});
      closingDebtRow.getCell(10).value = 'Dư nợ cuối kỳ';
      closingDebtRow.getCell(11).value = {
        formula: `K${openingDebtRowNumber}+K${summaryRowNumber}`,
      };

      closingDebtRow.getCell(10).alignment = {
        horizontal: 'left',
        vertical: 'middle',
      };
      closingDebtRow.getCell(10).font = {
        bold: true,
        size: 16,
        color: { argb: 'FF006400' },
      };
      closingDebtRow.getCell(10).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F5E9' },
      };

      closingDebtRow.getCell(11).alignment = {
        horizontal: 'right',
        vertical: 'middle',
      };
      closingDebtRow.getCell(11).font = {
        bold: true,
        size: 16,
        color: { argb: 'FF006400' },
      };
      closingDebtRow.getCell(11).numFmt = '#,##0';
      closingDebtRow.getCell(11).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE8F5E9' },
      };
      closingDebtRow.height = 30;

      // Format currency columns
      this.excelService.formatNumberColumns(
        worksheet,
        ['sellingPrice', 'receivingPrice'],
        '#,##0',
      );

      // Format date column
      this.excelService.formatDateColumns(
        worksheet,
        ['serviceDate'],
        'dd/mm/yyyy',
      );

      // Auto-fit columns
      this.excelService.autoFitColumnsWithConstraints(worksheet, {
        stt: { min: 6, max: 8 },
        serviceDate: { min: 12, max: 15 },
        guestName: { min: 15, max: 35 },
        vehicleType: { min: 10, max: 14 },
        routes: { min: 20, max: 50 },
        pickupLocation: { min: 18, max: 45 },
        dropoffLocation: { min: 18, max: 45 },
        guestCount: { min: 8, max: 12 },
        sellingPrice: { min: 14, max: 20 },
        receivingPrice: { min: 14, max: 18 },
        debtAmount: { min: 14, max: 18 },
        note: { min: 25, max: 60 },
      });

      const buffer = await this.excelService.generateBuffer(workbook);

      this.logger.info(
        `[CarBookingDebtExcelService] Successfully generated Excel for agency: ${report.agency.agency.name}, ` +
          `${report.agency.bookings.length} bookings`,
      );

      return buffer;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `[CarBookingDebtExcelService] Failed to generate Excel: ${errorMessage}`,
      );
      throw new Error('Failed to generate car booking debt Excel file');
    }
  }

  /**
   * Generate filename for car booking debt Excel.
   * Format: "CarDebt_[Month]_[Year]_[Agency_Name].xlsx"
   */
  generateFilename(report: CarBookingDebtDetailReport): string {
    const monthName = this.getMonthName(report.month);
    const agencyName = report.agency.agency.name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    return `CarDebt_${monthName}_${report.year}_${agencyName}.xlsx`;
  }

  private mapVehicleType(vehicleType: string): string {
    const map: Record<string, string> = {
      seats_4: '4 chỗ',
      seats_7: '7 chỗ',
      seats_16: '16 chỗ',
      seats_29: '29 chỗ',
      seats_45: '45 chỗ',
    };

    return map[vehicleType] ?? vehicleType;
  }

  private getMonthName(month: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return months[month - 1] || 'Unknown';
  }
}
