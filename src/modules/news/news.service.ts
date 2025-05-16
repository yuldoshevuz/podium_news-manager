import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlertInputDto } from './dtos/create-alert-input.dto';
import { CreateUpdateAlertInputDto } from './dtos/create-update-alert-input.dto';
import { logger } from 'src/config/logger';
import { NewsType } from './enums/news-type.enum';
import { CheckNewsOutputDto } from './dtos/check-news-output.dto';
import { plainToInstance } from 'class-transformer';
import { ClassTransformOptionsWithContext } from 'src/types/class-tranform-options-with-context';
import { GetAllNewsQueryDto } from './dtos/get-all-news-params.dto';
import { GetAllNewsOutputDto } from './dtos/get-all-news-output.dto';
import { Paginator } from 'src/common/pagination/paginator';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllNews(params: GetAllNewsQueryDto) {
    const { limit, offset, page, type } = params;

    const [news, total] = await this.prisma.$transaction([
      this.prisma.news.findMany({
        where: { type },
        take: limit,
        skip: offset,
        include: { content: true },
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.news.count({
        where: { type },
      }),
    ]);

    if (!news.length) throw new NotFoundException('News not found');

    const response = plainToInstance(GetAllNewsOutputDto, news, {
      excludeExtraneousValues: true,
      strategy: 'exposeAll',
      exposeUnsetFields: true,
    });

    return new Paginator(response, total, page, limit).build();
  }

  async changeStatus(id: number): Promise<null> {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    try {
      await this.prisma.news.update({
        where: { id },
        data: {
          active: !news.active,
        },
      });

      return null;
    } catch (error) {
      logger.error('Failed to change status news', error);
      throw new InternalServerErrorException('Failed to change status news');
    }
  }

  async checkNews(token: string): Promise<CheckNewsOutputDto> {
    const device = await this.prisma.device.findUnique({ where: { token } });

    if (!device) throw new BadRequestException('Device not found');

    const news = await this.prisma.news.findFirst({
      where: {
        active: true,
        NOT: { shown: { some: { device: { token } } } },
        created_at: { gte: device.created_at },
      },
      orderBy: { created_at: 'asc' },
      include: { content: true },
    });

    if (!news) throw new NotFoundException('There is no news for you yet');

    await this.prisma.deviceNewsShown.create({
      data: {
        device_id: device.id,
        news_id: news.id,
      },
    });

    const response = plainToInstance(CheckNewsOutputDto, news, {
      excludeExtraneousValues: true,
      strategy: 'exposeAll',
      exposeUnsetFields: true,
      context: { device },
    } as ClassTransformOptionsWithContext);

    return response;
  }

  async createBanner(image: Express.Multer.File): Promise<null> {
    try {
      await this.prisma.news.create({
        data: {
          type: NewsType.BANNER,
          active: true,
          content: {
            create: { image: image.filename },
          },
        },
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create banner');
    }
  }

  async createAlert(dto: CreateAlertInputDto): Promise<null> {
    try {
      await this.prisma.news.create({
        data: {
          type: NewsType.ALERT,
          active: true,
          content: {
            create: {
              title: dto.title,
              body: dto.body,
            },
          },
        },
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create alert');
    }
  }

  async createUpdateAlert(dto: CreateUpdateAlertInputDto): Promise<null> {
    try {
      await this.prisma.news.create({
        data: {
          type: NewsType.UPDATE_ALERT,
          active: true,
          content: {
            create: {
              title: dto.title,
              body: dto.body,
              url: dto.url,
            },
          },
        },
      });

      return null;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create update alert');
    }
  }
}
