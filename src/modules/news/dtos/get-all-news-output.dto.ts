import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { NewsType } from '../enums/news-type.enum';
import { NewsContent } from '@prisma/client';
import { INews } from 'src/types/i-news';
import { getFileUrl } from 'src/common/constants';

interface ITransformFnParams extends TransformFnParams {
  value: NewsContent;
  obj: INews;
}

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
  url: string[];
}

export class GetAllNewsOutputDto {
  @Expose()
  id: number;

  @Expose()
  type: NewsType;

  @Expose()
  active: boolean;

  @Expose()
  created_at: Date;

  @Expose()
  @Transform(
    ({
      value,
      obj,
    }: ITransformFnParams): IBanner | IAlert | IAlertUpdate | null => {
      const { type } = obj;

      if (type === NewsType.BANNER) {
        const imgUrl = getFileUrl(value.image ?? '');

        return { image: value.image ? imgUrl : '' };
      } else if (type === NewsType.ALERT) {
        return { title: value.title ?? '', body: value.body ?? '' };
      } else if (type === NewsType.UPDATE_ALERT) {
        return {
          title: value.title ?? '',
          body: value.body ?? '',
          url: value.url,
        };
      }

      return null;
    },
  )
  content: IBanner | IAlert | IAlertUpdate;
}
