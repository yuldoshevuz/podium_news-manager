import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/types/request-with-user';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.split(' ')[1];

    try {
      const decoded = await this.authService.verifyAccessToken(accessToken);

      if (!decoded.username) throw new UnauthorizedException();

      const existsUser = this.authService.find(decoded.username);

      if (!existsUser) throw new UnauthorizedException('User not found');

      request.user = existsUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
