import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';
import { IntegrationController } from './integration.controller';
import { IntegrationRepository } from './integration.repository';
import { IntegrationService } from './integration.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [IntegrationController],
  providers: [PrismaService, IntegrationRepository, IntegrationService],
})
export class IntegrationModule {}
