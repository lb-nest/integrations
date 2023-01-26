import { NotImplementedException } from '@nestjs/common';
import { Request } from 'express';
import { AbstractIntegration } from './abstract.integration';

export class AmocrmIntegration extends AbstractIntegration {
  postCreate(): any {
    return {
      amocrmUrl: 'https://amocrm.ru',
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
