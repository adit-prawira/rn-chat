import { MessageType } from '../enums';

export class Message {
  clientId: string;
  id: string;
  name: string;
  text: string;
  color: string;
  date: Date;
  type: MessageType;
}

export class User {
  name: string;
  color: string;
}
