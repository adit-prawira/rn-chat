import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, User } from './entities/message.entity';
import { v4 as uuid } from 'uuid';
import { Session } from './types';
import { MessageType } from './enums';
import { ColorService } from './color.service';

@Injectable()
export class MessagesService {
  private THEME_COLOR: string = '#4aa171';
  private clientToUser: Map<string, User> = new Map();
  private messages: Message[] = [];

  constructor(private colorService: ColorService) {}

  async join(name: string, clientId: string): Promise<Session> {
    const color = this.colorService.generateContrastColor(this.THEME_COLOR);
    this.clientToUser.set(clientId, {
      name,
      color,
    });
    this.messages.push({
      id: uuid(),
      name,
      clientId,
      color,
      text: `${name} joins the chat`,
      type: MessageType.EVENT,
      date: new Date(),
    });
    return {
      clientId,
      name,
    };
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message[]> {
    const { text, clientId, name } = createMessageDto;
    const user = this.clientToUser.get(clientId);
    const message: Message = {
      id: uuid(),
      name,
      text,
      clientId,
      color: user.color,
      type: MessageType.CHAT,
      date: new Date(),
    };
    this.messages.push(message);
    return this.messages;
  }

  async leave(clientId: string): Promise<void> {
    const user = this.clientToUser.get(clientId);
    if (user) {
      this.messages.push({
        id: uuid(),
        clientId,
        name: user.name,
        color: user.color,
        text: `${user.name} leaves the chat`,
        type: MessageType.EVENT,
        date: new Date(),
      });
      this.clientToUser.delete(clientId);
    }
  }

  async getClientName(clientId: string): Promise<User> {
    return this.clientToUser.get(clientId);
  }

  async findAll() {
    return this.messages;
  }
}
