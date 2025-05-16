import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from 'src/common/logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      logger.info(
        `${method} ${originalUrl} ${statusCode} - Headers: ${JSON.stringify(headers)} - Body: ${JSON.stringify(body)}`,
      );
    });

    next();
  }
}
