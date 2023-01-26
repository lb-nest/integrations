import Prisma from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Webhook implements Prisma.Webhook {
  id: number;

  @Exclude()
  projectId: number;

  eventType: Prisma.WebhookEventType;

  url: string;
}
