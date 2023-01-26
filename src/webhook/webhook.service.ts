import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Webhook } from './entities/webhook.entity';

@Injectable()
export class WebhookService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    projectId: number,
    createWebhookDto: CreateWebhookDto,
  ): Promise<Webhook> {
    return this.prismaService.webhook.create({
      data: {
        projectId,
        ...createWebhookDto,
      },
    });
  }

  findAll(projectId: number): Promise<Webhook[]> {
    return this.prismaService.webhook.findMany({
      where: {
        projectId,
      },
    });
  }

  findOne(projectId: number, id: number): Promise<Webhook> {
    return this.prismaService.webhook.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  update(
    projectId: number,
    updateWebhookDto: UpdateWebhookDto,
  ): Promise<Webhook> {
    return this.prismaService.webhook.update({
      where: {
        projectId_id: {
          projectId,
          id: updateWebhookDto.id,
        },
      },
      data: updateWebhookDto,
    });
  }

  remove(projectId: number, id: number): Promise<Webhook> {
    return this.prismaService.webhook.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }
}
