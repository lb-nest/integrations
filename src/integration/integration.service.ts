import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateIntegrationDto } from './dto/create-integration.dto';
import { UpdateIntegrationDto } from './dto/update-integration.dto';
import { Integration } from './entities/integration.entity';

@Injectable()
export class IntegrationService {
  initialize(projectId: number, token: string): Promise<Record<string, never>> {
    throw new NotImplementedException();
  }

  create(
    projectId: number,
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<Integration> {
    throw new NotImplementedException();
  }

  findAll(projectId: number): Promise<Integration[]> {
    throw new NotImplementedException();
  }

  findOne(projectId: number, id: string): Promise<Integration> {
    throw new NotImplementedException();
  }

  update(
    projectId: number,
    updateIntegrationDto: UpdateIntegrationDto,
  ): Promise<Integration> {
    throw new NotImplementedException();
  }

  remove(projectId: number, id: string): Promise<Integration> {
    throw new NotImplementedException();
  }
}
