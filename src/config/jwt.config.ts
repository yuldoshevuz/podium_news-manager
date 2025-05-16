import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXPIRES_IN, JWT_SECRET } from 'src/common/constants';

export const jwtConfig = (): JwtModuleOptions => {
  return {
    secret: JWT_SECRET,
    signOptions: { expiresIn: JWT_EXPIRES_IN },
  };
};
