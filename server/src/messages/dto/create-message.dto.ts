import { MessageType } from '../enums';

export class CreateMessageDto {
  clientId: string;
  name: string;
  text: string;
}
