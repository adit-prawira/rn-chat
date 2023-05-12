import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { ColorService } from './color.service';

@Module({
  providers: [MessagesGateway, MessagesService, ColorService],
})
export class MessagesModule {}
