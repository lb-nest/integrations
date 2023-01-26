import { NotImplementedException } from '@nestjs/common';
import { Request } from 'express';
import { AbstractIntegration } from './abstract.integration';

export class BitrixIntegration extends AbstractIntegration {
  postCreate(): any {
    return {
      bitrixUrl: 'https://bitrix.ru',
    };
  }

  handleInitialize(
    query: Request['query'],
    body: Request['body'],
  ): Promise<any> {
    throw new NotImplementedException();
  }

  handleWebhook(
    webhook: string,
    query: Request['query'],
    body: Request['body'],
  ): Promise<any> {
    throw new NotImplementedException();
  }
}
