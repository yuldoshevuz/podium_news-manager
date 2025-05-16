import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { RegisterDeviceInputDto } from './dto/register-device-input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PaginationPipe } from 'src/common/pagination/pagination.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiBearerAuth('authorization')
  @Get('')
  @UseGuards(AuthGuard)
  public async getDevices(
    @Query(new PaginationPipe()) params: PaginationQueryDto,
  ) {
    return this.deviceService.getDevices(params);
  }

  @Post('register')
  public async register(@Body() dto: RegisterDeviceInputDto) {
    return this.deviceService.register(dto);
  }
}
