import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEvent, EmitEvent } from './enums';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage(MessageEvent.CREATE_MESSAGE)
  async createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit(EmitEvent.MESSAGE, message);
    return message;
  }

  @SubscribeMessage(MessageEvent.FIND_MESSAGES)
  findMessages() {
    const messages = this.messagesService.findAll();
    console.info('called', messages);
    return messages;
  }

  @SubscribeMessage(MessageEvent.JOIN_ROOM)
  async joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ): Promise<string[]> {
    return this.messagesService.join(name, client.id);
  }

  @SubscribeMessage(MessageEvent.TYPING)
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientName(client.id);
    client.broadcast.emit(EmitEvent.TYPING, {
      name,
      isTyping,
    });
  }
}
