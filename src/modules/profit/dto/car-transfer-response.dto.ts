import { ApiProperty } from '@nestjs/swagger';

class CarTransferDetailResponseDto {
  @ApiProperty({ example: 'CB-20260501-XXXX' })
  originalBookingCode: string;

  @ApiProperty({ example: 'CB-20260501-XXXX-T' })
  transferBookingCode: string;

  @ApiProperty({ example: 'STours' })
  partnerAgencyName: string;

  @ApiProperty({ example: '5000000' })
  originalSellingPrice: string;

  @ApiProperty({ example: '5500000' })
  compensationAmount: string;

  @ApiProperty({
    description: 'compensationAmount - originalSellingPrice',
    example: '500000',
  })
  netCost: string;
}

class CarTransferPaginationMetaDto {
  @ApiProperty({ example: 25 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

export class PaginatedCarTransfersResponseDto {
  @ApiProperty({ type: [CarTransferDetailResponseDto] })
  data: CarTransferDetailResponseDto[];

  @ApiProperty({ type: CarTransferPaginationMetaDto })
  meta: CarTransferPaginationMetaDto;
}
