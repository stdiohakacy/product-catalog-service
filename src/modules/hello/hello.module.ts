import { Module } from '@nestjs/common';
import { HelloController } from './controllers/hello.controller';
import { MessageService } from 'src/common/message/services/message.service';

@Module({
  imports: [],
  providers: [MessageService],
  controllers: [HelloController],
})
export class HelloModule {}
