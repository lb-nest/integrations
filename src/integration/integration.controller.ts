import {
  All,
  Body,
  Controller,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Request } from 'express';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { Integration } from './entities/integration.entity';
import { IntegrationService } from './integration.service';

@Controller('integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @MessagePattern('createIntegration')
  create(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    return this.integrationService.create(projectId, createIntegrationDto);
  }

  @MessagePattern('findAllIntegrations')
  findAll(
    @Payload('projectId', ParseIntPipe) projectId: number,
  ): Promise<Integration[]> {
    return this.integrationService.findAll(projectId);
  }

  @MessagePattern('findOneIntegration')
  findOne(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseUUIDPipe) id: string,
  ): Promise<Integration> {
    return this.integrationService.findOne(projectId, id);
  }

  @MessagePattern('updateIntegration')
  update(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() updateIntegrationDto: UpdateIntegrationDto,
  ): Promise<Integration> {
    return this.integrationService.update(projectId, updateIntegrationDto);
  }

  @MessagePattern('removeIntegration')
  remove(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseUUIDPipe) id: string,
  ): Promise<Integration> {
    return this.integrationService.remove(projectId, id);
  }

  @All(':id/initialize')
  async handleInitialize(
    @Param('id') id: string,
    @Query() query: Request['query'],
    @Body() body: Request['body'],
  ): Promise<any> {
    return this.integrationService.handleInitialize(id, query, body);
  }

  @All(':id/webhook/:webhook')
  async handleWebhook(
    @Param('id') id: string,
    @Param('webhook') webhook: string,
    @Query() query: Request['query'],
    @Body() body: Request['body'],
  ): Promise<any> {
    return this.integrationService.handleWebhook(id, webhook, query, body);
  }
}
