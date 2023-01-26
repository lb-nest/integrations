import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { IntegrationType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AbstractIntegration } from './abstract.integration';
import { AmocrmIntegration } from './amocrm.integration';
import { BitrixIntegration } from './bitrix.integration';
import { Integration } from './entities/integration.entity';

@Injectable()
export class IntegrationRepository {
  private readonly [IntegrationType.Amocrm] = AmocrmIntegration;
  private readonly [IntegrationType.Bitrix] = BitrixIntegration;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    @Inject('BACKEND') private readonly client: ClientProxy,
  ) {}

  get(integration: Integration): AbstractIntegration {
    return new this[integration.type](
      integration,
      this.configService,
      this.prismaService,
      this.client,
    );
  }
}
