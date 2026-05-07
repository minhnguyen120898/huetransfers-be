import { Test, TestingModule } from '@nestjs/testing';
import { Decimal } from '@prisma/client/runtime/library';
import { CarBookingDebtExcelService } from '../car-booking-debt-excel.service';
import { ExcelExportService } from 'src/modules/common/services/excel-export.service';
import { LoggerService } from 'src/modules/common';
import { CarBookingDebtDetailReport } from '../car-booking-debt.service';

const mockExcelService = {
  createWorkbook: jest.fn().mockReturnValue({
    addWorksheet: jest.fn().mockReturnValue({
      getCell: jest
        .fn()
        .mockReturnValue({
          value: null,
          numFmt: '',
          font: {},
          fill: {},
          alignment: {},
          border: {},
        }),
      addRow: jest.fn().mockReturnValue({
        getCell: jest
          .fn()
          .mockReturnValue({
            value: null,
            numFmt: '',
            font: {},
            fill: {},
            alignment: {},
            height: 0,
          }),
        height: 0,
      }),
      mergeCells: jest.fn(),
      columns: [],
    }),
    xlsx: { writeBuffer: jest.fn().mockResolvedValue(Buffer.from('test')) },
  }),
  addWorksheetWithTitle: jest.fn().mockReturnValue({
    getCell: jest
      .fn()
      .mockReturnValue({
        value: null,
        numFmt: '',
        font: {},
        fill: {},
        alignment: {},
        border: {},
      }),
    addRow: jest.fn().mockReturnValue({
      getCell: jest
        .fn()
        .mockReturnValue({
          value: null,
          numFmt: '',
          font: {},
          fill: {},
          alignment: {},
          height: 0,
        }),
      height: 0,
    }),
    mergeCells: jest.fn(),
    columns: [],
  }),
  defineColumns: jest.fn(),
  styleTitleRow: jest.fn(),
  styleHeaderRow: jest.fn(),
  addDataRows: jest.fn(),
  addSummaryRow: jest.fn(),
  formatNumberColumns: jest.fn(),
  formatDateColumns: jest.fn(),
  autoFitColumnsWithConstraints: jest.fn(),
  generateBuffer: jest.fn().mockResolvedValue(Buffer.from('excel-content')),
};

const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };

const mockReport: CarBookingDebtDetailReport = {
  year: 2026,
  month: 4,
  period: {
    startDate: new Date('2026-04-01'),
    endDate: new Date('2026-04-30'),
  },
  agency: {
    agency: {
      id: 'agency-uuid-1',
      name: 'Hanoi Travel',
      tel: '+84-123-456-789',
      address: '123 Test St',
    },
    summary: {
      totalBookings: 1,
      totalGuests: 4,
      totalSellingPrice: new Decimal(1500000),
      totalReceivingPrice: new Decimal(0),
      totalDebt: new Decimal(1500000),
      previousMonthDebt: new Decimal(500000),
      allPaid: false,
    },
    bookings: [
      {
        id: 'cb-uuid-1',
        bookingCode: 'CB-20260415-AAAA',
        serviceDate: new Date('2026-04-15'),
        guestName: 'Nguyen Van A',
        guestPhone: '+84-901-111-111',
        guestCount: 4,
        vehicleType: 'seats_4',
        routes: 'Airport → Hotel',
        pickupLocation: 'Noi Bai Airport',
        dropoffLocation: 'Hoan Kiem Hotel',
        sellingPrice: new Decimal(1500000),
        receivingPrice: new Decimal(0),
        debtAmount: new Decimal(1500000),
        paymentStatus: 'pending',
        paidAt: null,
        note: null,
      },
    ],
  },
};

describe('CarBookingDebtExcelService', () => {
  let service: CarBookingDebtExcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarBookingDebtExcelService,
        { provide: ExcelExportService, useValue: mockExcelService },
        { provide: LoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<CarBookingDebtExcelService>(
      CarBookingDebtExcelService,
    );
    jest.clearAllMocks();
    // Re-assign after clearAllMocks
    mockExcelService.generateBuffer.mockResolvedValue(
      Buffer.from('excel-content'),
    );
    mockExcelService.addWorksheetWithTitle.mockReturnValue({
      getCell: jest
        .fn()
        .mockReturnValue({
          value: null,
          numFmt: '',
          font: {},
          fill: {},
          alignment: {},
        }),
      addRow: jest.fn().mockReturnValue({
        getCell: jest
          .fn()
          .mockReturnValue({
            value: null,
            numFmt: '',
            font: {},
            fill: {},
            alignment: {},
            height: 0,
          }),
        height: 0,
      }),
      mergeCells: jest.fn(),
      columns: [],
    });
  });

  describe('generateFilename', () => {
    it('should generate correct filename format', () => {
      const filename = service.generateFilename(mockReport);
      expect(filename).toBe('CarDebt_April_2026_Hanoi_Travel.xlsx');
    });

    it('should replace special characters in agency name with underscores', () => {
      const report = {
        ...mockReport,
        agency: {
          ...mockReport.agency,
          agency: { ...mockReport.agency.agency, name: 'Hà Nội & Travel Co.' },
        },
      };
      const filename = service.generateFilename(report);
      expect(filename).toMatch(/^CarDebt_April_2026_.*\.xlsx$/);
      const namePart = filename
        .replace('CarDebt_April_2026_', '')
        .replace('.xlsx', '');
      expect(namePart).not.toContain('&');
      expect(namePart).not.toContain('.');
    });

    it('should not have leading or trailing underscores in agency name part', () => {
      const report = {
        ...mockReport,
        agency: {
          ...mockReport.agency,
          agency: { ...mockReport.agency.agency, name: '___Test Agency___' },
        },
      };
      const filename = service.generateFilename(report);
      const namePart = filename
        .replace('CarDebt_April_2026_', '')
        .replace('.xlsx', '');
      expect(namePart).not.toMatch(/^_|_$/);
    });
  });

  describe('generateCarBookingDebtExcel', () => {
    it('should return a Buffer', async () => {
      const buffer = await service.generateCarBookingDebtExcel(mockReport);
      expect(Buffer.isBuffer(buffer)).toBe(true);
    });

    it('should call excelService.createWorkbook', async () => {
      mockExcelService.createWorkbook.mockReturnValue({
        addWorksheet: jest.fn().mockReturnValue({ columns: [] }),
        xlsx: { writeBuffer: jest.fn().mockResolvedValue(Buffer.from('test')) },
      });
      mockExcelService.generateBuffer.mockResolvedValue(Buffer.from('excel'));
      await service.generateCarBookingDebtExcel(mockReport);
      expect(mockExcelService.createWorkbook).toHaveBeenCalled();
    });

    it('should call excelService.defineColumns with 12 columns', async () => {
      await service.generateCarBookingDebtExcel(mockReport);
      expect(mockExcelService.defineColumns).toHaveBeenCalledWith(
        expect.anything(),
        expect.arrayContaining([
          expect.objectContaining({ key: 'stt' }),
          expect.objectContaining({ key: 'serviceDate' }),
          expect.objectContaining({ key: 'guestName' }),
          expect.objectContaining({ key: 'vehicleType' }),
          expect.objectContaining({ key: 'routes' }),
          expect.objectContaining({ key: 'pickupLocation' }),
          expect.objectContaining({ key: 'dropoffLocation' }),
          expect.objectContaining({ key: 'guestCount' }),
          expect.objectContaining({ key: 'sellingPrice' }),
          expect.objectContaining({ key: 'receivingPrice' }),
          expect.objectContaining({ key: 'debtAmount' }),
          expect.objectContaining({ key: 'note' }),
        ]),
      );
    });
  });

  describe('vehicleType mapping (via generateCarBookingDebtExcel)', () => {
    const vehicleTypes = [
      { raw: 'seats_4', expected: '4 chỗ' },
      { raw: 'seats_7', expected: '7 chỗ' },
      { raw: 'seats_16', expected: '16 chỗ' },
      { raw: 'seats_29', expected: '29 chỗ' },
      { raw: 'seats_45', expected: '45 chỗ' },
      { raw: 'unknown_type', expected: 'unknown_type' },
    ];

    vehicleTypes.forEach(({ raw, expected }) => {
      it(`should map "${raw}" to "${expected}"`, async () => {
        const report = {
          ...mockReport,
          agency: {
            ...mockReport.agency,
            bookings: [{ ...mockReport.agency.bookings[0], vehicleType: raw }],
          },
        };

        let capturedRows: any[] = [];
        mockExcelService.addDataRows.mockImplementation((_, rows) => {
          capturedRows = rows;
        });

        await service.generateCarBookingDebtExcel(report);
        expect(capturedRows[0]?.vehicleType).toBe(expected);
      });
    });
  });
});
