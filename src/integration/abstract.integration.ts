import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { Integration } from './entities/integration.entity';

export abstract class AbstractIntegration {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    protected integration: Integration,
    protected readonly configService: ConfigService,
    protected readonly prismaService: PrismaService,
    protected readonly client: ClientProxy,
  ) {}

  abstract postCreate(): any;

  abstract handleInitialize(
    query: Request['query'],
    body: Request['body'],
  ): Promise<any>;

  abstract handleWebhook(
    webhook: string,
    query: Request['query'],
    body: Request['body'],
  ): Promise<any>;
}
