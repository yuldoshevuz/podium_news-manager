import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterDeviceInputDto } from './dto/register-device-input.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginator } from 'src/common/pagination/paginator';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}
  async getDevices(params: PaginationQueryDto) {
    const { limit, offset, page } = params;

    try {
      const [devices, total] = await this.prisma.$transaction([
        this.prisma.device.findMany({
          take: limit,
          skip: offset,
          orderBy: { created_at: 'desc' },
        }),
        this.prisma.device.count(),
      ]);

      return new Paginator(devices, total, page, limit).build();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async register(dto: RegisterDeviceInputDto): Promise<null> {
    const { token, app_version, locate, timezone, os } = dto;

    try {
      await this.prisma.device.upsert({
        where: { token },
        create: { token, app_version, locate, timezone, os },
        update: {},
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException('Failed to register device');
    }
  }
}
