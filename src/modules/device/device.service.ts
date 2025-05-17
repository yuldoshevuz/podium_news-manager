import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDeviceInputDto } from './dto/register-device-input.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Paginator } from 'src/common/pagination/paginator';
import { logger } from 'src/common/logger';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}
  async getDevices(params: PaginationQueryDto) {
    const { limit, offset, page } = params;

    const [devices, total] = await this.prisma
      .$transaction([
        this.prisma.device.findMany({
          take: limit,
          skip: offset,
          orderBy: { created_at: 'desc' },
        }),
        this.prisma.device.count(),
      ])
      .catch((error) => {
        logger.error(error);
        throw new InternalServerErrorException('Error in getting devices');
      });

    if (!devices.length) throw new NotFoundException('Devices not found');

    return new Paginator(devices, total, page, limit).build();
  }

  async register(
    dto: RegisterDeviceInputDto,
    device_id?: string,
  ): Promise<null> {
    if (!device_id) throw new BadRequestException('Please send DeviceID');

    const { token, app_version, locate, timezone, os } = dto;

    try {
      const deviceExists = await this.prisma.device.findUnique({
        where: { device_id },
        select: { token: true },
      });

      if (!deviceExists) {
        await this.prisma.device.create({
          data: {
            device_id,
            token,
            app_version,
            locate,
            timezone,
            os,
          },
        });

        return null;
      }

      if (deviceExists.token !== token) {
        await this.prisma.device.update({
          where: { device_id },
          data: { token },
        });
      }

      return null;
    } catch (error) {
      logger.error(error);
      throw new InternalServerErrorException('Failed to register device');
    }
  }
}
