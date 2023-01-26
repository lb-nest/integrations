import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { Integration } from './entities/integration.entity';
import { IntegrationRepository } from './integration.repository';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly integrationRepository: IntegrationRepository,
  ) {}

  async create(
    projectId: number,
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    const integration = await this.prismaService.integration.create({
      data: {
        projectId,
        ...createIntegrationDto,
      },
    });

    return Object.assign(integration, {
      payload: this.integrationRepository.get(integration).postCreate(),
    });
  }

  findAll(projectId: number): Promise<Integration[]> {
    return this.prismaService.integration.findMany({
      where: {
        projectId,
      },
    });
  }

  findOne(projectId: number, id: string): Promise<Integration> {
    return this.prismaService.integration.findUniqueOrThrow({
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
    updateIntegrationDto: UpdateIntegrationDto,
  ): Promise<Integration> {
    return this.prismaService.integration.update({
      where: {
        projectId_id: {
          projectId,
          id: updateIntegrationDto.id,
        },
      },
      data: updateIntegrationDto,
    });
  }

  remove(projectId: number, id: string): Promise<Integration> {
    return this.prismaService.integration.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  async handleInitialize(
    id: string,
    query: Request['query'],
    body: Request['body'],
  ): Promise<any> {
    if (id === 'amocrm') {
      id = query.state?.toString();
    }

    return this.integrationRepository
      .get(
        await this.prismaService.integration.findUniqueOrThrow({
          where: {
            id,
          },
        }),
      )
      .handleInitialize(query, body);
  }

  async handleWebhook(
    id: string,
    webhook: string,
    query: Request['query'],
    body: Request['body'],
  ): Promise<any> {
    return this.integrationRepository
      .get(
        await this.prismaService.integration.findUniqueOrThrow({
          where: {
            id,
          },
        }),
      )
      .handleWebhook(webhook, query, body);
  }
}
