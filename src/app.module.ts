import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { IntegrationModule } from './integration/integration.module';
import { PrismaService } from './prisma.service';
import { BACKEND } from './shared/constants/broker';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        BROKER_URL: Joi.string().uri().required(),
        PORT: Joi.number().port().default(8080),
        AMOCRM_CLIENT_ID: Joi.string().required(),
        AMOCRM_CLIENT_SECRET: Joi.string().required(),
        AMOCRM_REDIRECT_URI: Joi.string().uri().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: BACKEND,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('BROKER_URL')],
            queue: `${BACKEND}_QUEUE`,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    IntegrationModule,
    WebhookModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [ClientsModule],
})
export class AppModule {}
