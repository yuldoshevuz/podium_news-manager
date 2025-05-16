import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { DeviceModule } from './device/device.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { STATIC_SERVE_ROOT } from 'src/common/constants';

@Module({
  imports: [
    AuthModule,
    DeviceModule,
    NewsModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: STATIC_SERVE_ROOT,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
