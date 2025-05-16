import { Prisma } from '@prisma/client';

export interface INews
  extends Prisma.NewsGetPayload<{
    include: { content: true };
  }> {}
