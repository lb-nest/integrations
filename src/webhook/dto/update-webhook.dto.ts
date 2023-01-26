import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {
  @IsInt()
  id: number;
}
