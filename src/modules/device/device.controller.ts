import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { RegisterDeviceInputDto } from './dto/register-device-input.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { PaginationPipe } from 'src/common/pagination/pagination.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CheckDevice } from '../news/guards/check-device.guard';

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

  @ApiHeader({
    name: 'DeviceID',
    description: 'Unique ID of the device',
    required: true,
  })
  @Post('register')
  public async register(
    @Body() dto: RegisterDeviceInputDto,
    @Headers('DeviceID') deviceId?: string,
  ) {
    return this.deviceService.register(dto, deviceId);
  }
}
