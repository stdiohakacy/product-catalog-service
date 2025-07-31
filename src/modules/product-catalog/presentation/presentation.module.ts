import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from '../application/application.module';
import { ProductController } from './rest/product.controller';

const grpcControllers = [];
const restControllers = [ProductController];
const graphqlResolvers = [];

const controllers = [...grpcControllers, ...restControllers];
const providers = [...graphqlResolvers];

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers,
  providers,
  exports: [...providers],
})
export class PresentationModule {}
