import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private clientToUser: Map<string, string> = new Map();
  private messages: Message[] = [
    {
      name: 'John',
      text: 'Hey man',
    },
  ];

  async create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(createMessageDto);
    return message;
  }

  async join(name: string, clientId: string): Promise<string[]> {
    this.clientToUser.set(clientId, name);
    return [...this.clientToUser.values()];
  }

  async getClientName(clientId: string): Promise<string> {
    return this.clientToUser.get(clientId);
  }

  findAll() {
    return;
  }
}
