import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { Integration } from './entities/integration.entity';
import { IntegrationService } from './integration.service';

@Controller()
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @MessagePattern('integrations.initialize')
  initialize(): Promise<Record<string, never>> {
    return this.integrationService.initialize(NaN, '');
  }

  @MessagePattern('integrations.create')
  create(
    @Payload('payload') createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    return this.integrationService.create(NaN, createIntegrationDto);
  }

  @MessagePattern('integrations.findAll')
  findAll(): Promise<Integration[]> {
    return this.integrationService.findAll(NaN);
  }

  @MessagePattern('integrations.findOne')
  findOne(@Payload('payload') id: string): Promise<Integration> {
    return this.integrationService.findOne(NaN, id);
  }

  @MessagePattern('integrations.update')
  update(
    @Payload('payload') updateIntegrationDto: UpdateIntegrationDto,
  ): Promise<Integration> {
    return this.integrationService.update(NaN, updateIntegrationDto);
  }

  @MessagePattern('integrations.remove')
  remove(@Payload('paylaod') id: string): Promise<Integration> {
    return this.integrationService.remove(NaN, id);
  }
}
