import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { v4 as uuid } from 'uuid';
import { Session } from './types';

@Injectable()
export class MessagesService {
  private clientToUser: Map<string, string> = new Map();
  private messages: Message[] = [];

  async create(createMessageDto: CreateMessageDto): Promise<Message[]> {
    const { text, clientId, name } = createMessageDto;
    const message: Message = {
      id: uuid(),
      name,
      text,
      clientId,
      date: new Date(),
    };
    this.messages.push(message);
    return this.messages;
  }

  async join(name: string, clientId: string): Promise<Session> {
    this.clientToUser.set(clientId, name);
    return {
      clientId,
      name,
    };
  }

  async leave(clientId: string): Promise<void> {
    this.clientToUser.delete(clientId);
  }

  async getClientName(clientId: string): Promise<string> {
    return this.clientToUser.get(clientId);
  }

  async findAll() {
    return this.messages;
  }
}
