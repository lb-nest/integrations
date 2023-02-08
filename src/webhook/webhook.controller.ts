import { Controller, SerializeOptions } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';
import { WebhookService } from './webhook.service';

@SerializeOptions({
  type: Webhook,
})
@Controller()
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @MessagePattern('createWebhook')
  create(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() createWebhookDto: CreateWebhookDto,
  ): Promise<Webhook> {
    return this.webhookService.create(projectId, createWebhookDto);
  }

  @MessagePattern('findAllWebhooks')
  findAll(
    @Payload('projectId', ParseIntPipe) projectId: number,
  ): Promise<Webhook[]> {
    return this.webhookService.findAll(projectId);
  }

  @MessagePattern('findOneWebhook')
  findOne(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ): Promise<Webhook> {
    return this.webhookService.findOne(projectId, id);
  }

  @MessagePattern('updateWebhook')
  update(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() updateWebhookDto: UpdateWebhookDto,
  ): Promise<Webhook> {
    return this.webhookService.update(projectId, updateWebhookDto);
  }

  @MessagePattern('removeWebhook')
  remove(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ): Promise<Webhook> {
    return this.webhookService.remove(projectId, id);
  }
}
