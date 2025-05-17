import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload/upload.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
} from '@nestjs/swagger';
import { CreateBannerInputDto } from './dtos/create-banner-input.dto';
import { CreateAlertInputDto } from './dtos/create-alert-input.dto';
import { CreateUpdateAlertInputDto } from './dtos/create-update-alert-input.dto';
import { ParseIntPipe } from '@nestjs/common';
import { CheckDevice } from './guards/check-device.guard';
import { PaginationPipe } from 'src/common/pagination/pagination.pipe';
import { GetAllNewsQueryDto } from './dtos/get-all-news-params.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiBearerAuth('authorization')
  @Get('')
  @UseGuards(AuthGuard)
  getAll(@Query(new PaginationPipe()) params: GetAllNewsQueryDto) {
    return this.newsService.getAllNews(params);
  }

  @ApiHeader({
    name: 'DeviceID',
    description: 'Unique ID of the device',
    required: true,
  })
  @UseGuards(CheckDevice)
  @Get('check-news')
  checkNews(@Headers('DeviceID') deviceId: string) {
    return this.newsService.checkNews(deviceId);
  }

  @ApiBearerAuth('authorization')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateBannerInputDto })
  @Post('banner')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', new UploadService().uploadFileOptions()),
  )
  createBanner(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    image: Express.Multer.File,
  ) {
    return this.newsService.createBanner(image);
  }

  @ApiBearerAuth('authorization')
  @Post('alert')
  @UseGuards(AuthGuard)
  createAlert(@Body() body: CreateAlertInputDto) {
    return this.newsService.createAlert(body);
  }

  @ApiBearerAuth('authorization')
  @Post('alert-update')
  @UseGuards(AuthGuard)
  createUpdateAlert(@Body() body: CreateUpdateAlertInputDto) {
    return this.newsService.createUpdateAlert(body);
  }

  @ApiBearerAuth('authorization')
  @Post('change-status/:id')
  @UseGuards(AuthGuard)
  changeStatus(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.changeStatus(id);
  }
}
