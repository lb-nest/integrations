import { IntegrationType } from '@prisma/client';
import { IsEnum, IsString, ValidateIf } from 'class-validator';

export class CreateIntegrationDto {
  @IsEnum(IntegrationType)
  type: IntegrationType;

  @IsString()
  accountId: string;

  @ValidateIf(
    (object: CreateIntegrationDto) => object.type === IntegrationType.Bitrix,
  )
  @IsString()
  token?: string;
}
