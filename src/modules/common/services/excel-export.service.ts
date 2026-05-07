import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Decimal } from '@prisma/client/runtime/library';
import { LoggerService } from '../provider/logger.service';

/**
 * Generic Excel Export Service
 *
 * Provides reusable Excel generation functionality with:
 * - Professional styling
 * - Automatic column width adjustment
 * - Number/date formatting
 * - Header/footer support
 * - Error handling
 *
 * USAGE:
 * 1. Create workbook
 * 2. Define columns
 * 3. Add rows
 * 4. Apply styling
 * 5. Generate buffer
 */
@Injectable()
export class ExcelExportService {
  constructor(private readonly logger: LoggerService) {}

  /**
   * Create a new Excel workbook with default settings
   */
  createWorkbook(): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();

    // Set workbook metadata
    workbook.creator = 'Tour Booking Management System';
    workbook.created = new Date();
    workbook.modified = new Date();

    return workbook;
  }

  /**
   * Add a worksheet with title row
   *
   * @param workbook - Excel workbook
   * @param sheetName - Name of the worksheet
   * @param title - Title for the first row (will be added after columns are defined)
   * @returns Created worksheet
   */
  addWorksheetWithTitle(
    workbook: ExcelJS.Workbook,
    sheetName: string,
    title: string,
  ): ExcelJS.Worksheet {
    const worksheet = workbook.addWorksheet(sheetName, {
      views: [{ state: 'frozen', ySplit: 2 }], // Freeze title and header rows
    });

    // Note: Title row will be added AFTER columns are defined
    // Store title in worksheet for later use
    (worksheet as any)._titleText = title;

    return worksheet;
  }

  /**
   * Define columns for the worksheet
   *
   * IMPORTANT: This must be called BEFORE styleTitleRow()
   * Because setting worksheet.columns adds the header row automatically
   *
   * @param worksheet - Target worksheet
   * @param columns - Column definitions
   */
  defineColumns(
    worksheet: ExcelJS.Worksheet,
    columns: Array<{
      header: string;
      key: string;
      width?: number;
      style?: Partial<ExcelJS.Style>;
    }>,
  ): void {
    // Setting columns will automatically add header row at row 1
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: col.width || 15,
      style: col.style || {},
    }));

    // Insert empty row at the top for title (push headers down to row 2)
    worksheet.spliceRows(1, 0, []);
  }

  /**
   * Style the title row (row 1)
   *
   * IMPORTANT: Call this AFTER defineColumns()
   *
   * @param worksheet - Target worksheet
   * @param title - Title text
   */
  styleTitleRow(worksheet: ExcelJS.Worksheet, title: string): void {
    const titleRow = worksheet.getRow(1);

    // Merge title across all columns
    const columnCount = worksheet.columns.length;
    if (columnCount > 1) {
      worksheet.mergeCells(1, 1, 1, columnCount);
    }

    // Set title cell value
    const titleCell = worksheet.getCell(1, 1);
    titleCell.value = title;

    // Apply styling
    titleCell.font = {
      name: 'Arial',
      size: 16,
      bold: true,
      color: { argb: 'FF1F4788' }, // Dark blue
    };
    titleCell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE7F3FF' }, // Light blue background
    };

    titleRow.height = 30;
  }

  /**
   * Style the header row (row 2)
   *
   * @param worksheet - Target worksheet
   */
  styleHeaderRow(worksheet: ExcelJS.Worksheet): void {
    const headerRow = worksheet.getRow(2);

    headerRow.eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 11,
        bold: true,
        color: { argb: 'FFFFFFFF' }, // White text
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4788' }, // Dark blue background
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      };
    });

    headerRow.height = 25;
  }

  /**
   * Add and style data rows
   *
   * @param worksheet - Target worksheet
   * @param data - Array of data objects
   * @param startRow - Row number to start adding data (default: 3)
   */
  addDataRows<T extends Record<string, any>>(
    worksheet: ExcelJS.Worksheet,
    data: T[],
    startRow: number = 3,
  ): void {
    data.forEach((item, index) => {
      const rowData: any = {};

      // Convert data to row format
      Object.keys(item).forEach((key) => {
        const value = item[key];

        // Handle Decimal type from Prisma
        if (value instanceof Decimal) {
          rowData[key] = parseFloat(value.toString());
        }
        // Handle Date objects
        else if (value instanceof Date) {
          rowData[key] = value;
        }
        // Handle null/undefined
        else if (value === null || value === undefined) {
          rowData[key] = '';
        }
        // Everything else
        else {
          rowData[key] = value;
        }
      });

      const row = worksheet.addRow(rowData);

      // Style data row
      row.eachCell((cell) => {
        cell.font = {
          name: 'Arial',
          size: 10,
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true,
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
          right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        };
      });

      // Alternate row colors for better readability
      if (index % 2 === 1) {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF9F9F9' }, // Light gray
          };
        });
      }

      row.height = 20;
    });
  }

  /**
   * Add a summary row at the bottom
   *
   * @param worksheet - Target worksheet
   * @param summaryData - Summary data object
   * @param labelColumn - Column index for labels (1-based)
   */
  addSummaryRow(
    worksheet: ExcelJS.Worksheet,
    summaryData: Record<string, any>,
    labelColumn: number = 1,
  ): void {
    const lastRow = worksheet.lastRow;
    if (!lastRow) return;

    const summaryRow = worksheet.addRow(summaryData);

    // Style summary row
    summaryRow.eachCell((cell, colNumber) => {
      cell.font = {
        name: 'Arial',
        size: 11,
        bold: true,
        color: { argb: 'FFFFFFFF' }, // White text
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: colNumber === labelColumn ? 'left' : 'right',
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F4788' }, // Dark blue background
      };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'medium', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } },
      };
    });

    summaryRow.height = 25;
  }

  /**
   * Format number columns
   *
   * @param worksheet - Target worksheet
   * @param columnKeys - Array of column keys to format as numbers
   * @param format - Excel number format (default: #,##0)
   */
  formatNumberColumns(
    worksheet: ExcelJS.Worksheet,
    columnKeys: string[],
    format: string = '#,##0',
  ): void {
    const columns = worksheet.columns;

    columnKeys.forEach((key) => {
      const column = columns.find((col) => col.key === key);
      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
          // Skip header rows
          if (rowNumber > 2) {
            cell.numFmt = format;
            if (cell.alignment) {
              cell.alignment.horizontal = 'right';
            } else {
              cell.alignment = { horizontal: 'right' };
            }
          }
        });
      }
    });
  }

  /**
   * Format date columns
   *
   * @param worksheet - Target worksheet
   * @param columnKeys - Array of column keys to format as dates
   * @param format - Excel date format (default: dd/mm/yyyy)
   */
  formatDateColumns(
    worksheet: ExcelJS.Worksheet,
    columnKeys: string[],
    format: string = 'dd/mm/yyyy',
  ): void {
    const columns = worksheet.columns;

    columnKeys.forEach((key) => {
      const column = columns.find((col) => col.key === key);
      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
          // Skip header rows
          if (rowNumber > 2) {
            cell.numFmt = format;
            if (cell.alignment) {
              cell.alignment.horizontal = 'center';
            } else {
              cell.alignment = { horizontal: 'center' };
            }
          }
        });
      }
    });
  }

  /**
   * Auto-fit column widths based on content with per-column constraints
   * Also enables text wrapping and adjusts row heights for cells that exceed column width
   *
   * Better than autoFitColumns because it allows different min/max per column type
   *
   * @param worksheet - Target worksheet
   * @param columnConstraints - Map of column keys to their min/max width constraints
   *
   * @example
   * autoFitColumnsWithConstraints(worksheet, {
   *   stt: { min: 6, max: 8 },
   *   date: { min: 12, max: 15 },
   *   tour: { min: 20, max: 50 },
   *   note: { min: 25, max: 60 },
   * });
   */
  autoFitColumnsWithConstraints(
    worksheet: ExcelJS.Worksheet,
    columnConstraints: Record<string, { min: number; max: number }> = {},
  ): void {
    // Track which rows need height adjustment
    const rowHeights = new Map<number, number>();

    worksheet.columns.forEach((column) => {
      if (!column || !column.key) return;

      const key = column.key;
      const constraints = columnConstraints[key] || { min: 10, max: 50 };

      let maxLength = 0;

      if (column.eachCell) {
        column.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
          // Skip title row (row 1) and header row (row 2)
          if (rowNumber <= 2) return;

          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const cellValue = cell.value?.toString() || '';
          maxLength = Math.max(maxLength, cellValue.length);
        });
      }

      // Calculate width (characters + 2 for padding)
      const calculatedWidth = Math.max(
        constraints.min,
        Math.min(constraints.max, maxLength + 2),
      );

      column.width = calculatedWidth;

      // Now check each cell to see if content exceeds column width
      // If so, enable wrapping and calculate required row height
      if (column.eachCell) {
        column.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
          // Skip title row (row 1) and header row (row 2)
          if (rowNumber <= 2) return;

          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const cellValue = cell.value?.toString() || '';
          const contentLength = cellValue.length;

          // If content exceeds column width, enable wrapping
          if (contentLength > calculatedWidth) {
            // Enable text wrapping
            cell.alignment = {
              ...cell.alignment,
              wrapText: true,
            };

            // Calculate number of lines needed
            const linesNeeded = Math.ceil(contentLength / calculatedWidth);
            const requiredHeight = Math.max(20, linesNeeded * 15); // 15 points per line, min 20

            // Track the maximum height needed for this row
            const currentMaxHeight = rowHeights.get(rowNumber) || 20;
            if (requiredHeight > currentMaxHeight) {
              rowHeights.set(rowNumber, requiredHeight);
            }
          }
        });
      }
    });

    // Apply calculated row heights
    rowHeights.forEach((height, rowNumber) => {
      const row = worksheet.getRow(rowNumber);
      if (row) {
        row.height = height;
      }
    });
  }

  /**
   * @deprecated Use autoFitColumnsWithConstraints for better control
   * Auto-fit column widths based on content
   *
   * @param worksheet - Target worksheet
   * @param minWidth - Minimum column width (default: 10)
   * @param maxWidth - Maximum column width (default: 50)
   */
  autoFitColumns(
    worksheet: ExcelJS.Worksheet,
    minWidth: number = 10,
    maxWidth: number = 50,
  ): void {
    worksheet.columns.forEach((column) => {
      let maxLength = 0;

      if (column && column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell) => {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const cellValue = cell.value?.toString() || '';
          maxLength = Math.max(maxLength, cellValue.length);
        });
      }

      // Calculate width (characters * 1.2 for buffer)
      const calculatedWidth = Math.max(
        minWidth,
        Math.min(maxWidth, maxLength * 1.2),
      );
      if (column) {
        column.width = calculatedWidth;
      }
    });
  }

  /**
   * Generate Excel file as buffer
   *
   * @param workbook - Excel workbook
   * @returns Promise<Buffer> - Excel file buffer
   */
  async generateBuffer(workbook: ExcelJS.Workbook): Promise<Buffer> {
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      return Buffer.from(buffer);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `[ExcelExportService] Failed to generate Excel buffer: ${errorMessage}`,
      );
      throw new Error('Failed to generate Excel file');
    }
  }

  /**
   * Format Vietnamese currency
   *
   * @param value - Number or Decimal value
   * @returns Formatted string
   */
  formatCurrency(value: number | Decimal | null | undefined): string {
    if (value === null || value === undefined) return '0';

    const numValue =
      value instanceof Decimal ? parseFloat(value.toString()) : value;
    return numValue.toLocaleString('vi-VN');
  }

  /**
   * Format date to Vietnamese format
   *
   * @param date - Date object
   * @returns Formatted string (dd/mm/yyyy)
   */
  formatDate(date: Date | null | undefined): string {
    if (!date) return '';

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
