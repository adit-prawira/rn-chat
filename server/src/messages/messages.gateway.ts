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
import { Session } from './types';
import { ColorService } from './color.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  private THEME_COLOR: string = '#4aa171';

  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly colorService: ColorService,
  ) {}

  @SubscribeMessage(MessageEvent.CREATE_MESSAGE)
  async createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
  ): Promise<Message[]> {
    const messages = await this.messagesService.create(createMessageDto);
    this.server.emit(EmitEvent.MESSAGE, messages);
    return messages;
  }

  @SubscribeMessage(MessageEvent.FIND_MESSAGES)
  async findMessages(): Promise<Message[]> {
    const messages = await this.messagesService.findAll();
    return messages;
  }

  @SubscribeMessage(MessageEvent.JOIN_ROOM)
  async joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ): Promise<Session> {
    const color = this.colorService.generateContrastColor(this.THEME_COLOR);
    const session = await this.messagesService.join(name, client.id, {
      with: { color },
    });
    const messages = await this.messagesService.findAll();
    this.server.emit(EmitEvent.MESSAGE, messages);
    return session;
  }

  @SubscribeMessage(MessageEvent.LEAVE_ROOM)
  async leaveRoom(@MessageBody('clientId') clientId: string): Promise<string> {
    await this.messagesService.leave(clientId);
    const messages = await this.messagesService.findAll();
    this.server.emit(EmitEvent.MESSAGE, messages);
    return 'success';
  }

  @SubscribeMessage(MessageEvent.TYPING)
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('clientId') clientId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientName(clientId);
    client.broadcast.emit(EmitEvent.TYPING, {
      name,
      isTyping,
    });
  }
}
