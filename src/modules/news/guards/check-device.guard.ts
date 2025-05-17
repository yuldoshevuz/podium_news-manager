import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { RequestWithDevice } from 'src/types/request-with-device';

@Injectable()
export class CheckDevice implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<RequestWithDevice>();

    const deviceId = request.headers['deviceid'];

    if (!deviceId) throw new UnauthorizedException('Please send DeviceID');

    const device = await this.prisma.device.findUnique({
      where: { device_id: deviceId },
    });

    if (!device) {
      throw new ForbiddenException('Device does not exist, please register it');
    }

    return true;
  }
}
