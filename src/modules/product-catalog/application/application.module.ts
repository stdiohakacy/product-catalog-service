import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddProductHandler } from './ports/inbound/commands/handlers/add.product.handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

const queryHandlers = [AddProductHandler];

const commandHandlers = [];

const useCases = [];

const eventHandlers = [];

const sagas = [];

const providers = [
  ...queryHandlers,
  ...commandHandlers,
  ...useCases,
  ...eventHandlers,
  ...sagas,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
