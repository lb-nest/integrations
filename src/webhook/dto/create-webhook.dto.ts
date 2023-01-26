import { WebhookEventType } from '@prisma/client';
import { IsEnum, IsUrl } from 'class-validator';

export class CreateWebhookDto {
  @IsEnum(WebhookEventType)
  eventType: WebhookEventType;

  @IsUrl()
  url: string;
}
