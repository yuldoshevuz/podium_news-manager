import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { NewsType } from '../enums/news-type.enum';
import { Device, NewsContent } from '@prisma/client';
import { INews } from 'src/types/i-news';
import { ClassTransformOptionsWithContext } from 'src/types/class-tranform-options-with-context';
import * as path from 'path';
import { getFileUrl, HOSTNAME, STATIC_SERVE_ROOT } from 'src/common/constants';

class IBanner {
  image: string;
}

class IAlert {
  title: string;
  body: string;
}

class IAlertUpdate {
  title: string;
  body: string;
  url: string;
}

interface ITransformFnParams extends TransformFnParams {
  value: NewsContent;
  obj: INews;
  options: ClassTransformOptionsWithContext<{ device: Device }>;
}

export class CheckNewsOutputDto {
  @Expose()
  id: number;

  @Expose()
  type: NewsType;

  @Expose()
  created_at: Date;

  @Expose()
  @Transform(
    ({
      value,
      obj,
      options,
    }: ITransformFnParams): IBanner | IAlert | IAlertUpdate | null => {
      const { type } = obj;

      if (type === NewsType.BANNER) {
        const imgUrl = getFileUrl(value.image ?? '');

        return { image: value.image ? imgUrl : '' };
      } else if (type === NewsType.ALERT) {
        return { title: value.title ?? '', body: value.body ?? '' };
      } else if (type === NewsType.UPDATE_ALERT) {
        const { device } = options.context;

        return {
          title: value.title ?? '',
          body: value.body ?? '',
          url: value.url.length === 2 ? value.url[device.os - 1] : '',
        };
      }

      return null;
    },
  )
  content: IBanner | IAlert | IAlertUpdate;
}
