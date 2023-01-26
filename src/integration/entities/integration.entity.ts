import Prisma from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Integration implements Prisma.Integration {
  id: string;

  @Exclude()
  projectId: number;

  type: Prisma.IntegrationType;

  @Exclude()
  accountId: string;

  @Exclude()
  token: any;

  payload?: any;
}
