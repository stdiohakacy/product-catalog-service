import { Module } from '@nestjs/common';
import { HelloController } from './controllers/hello.controller';

@Module({
  imports: [],
  controllers: [HelloController],
})
export class HelloModule {}
