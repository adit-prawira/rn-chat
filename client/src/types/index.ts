import {MessageType} from 'enums';

export type TMessage = {
  clientId: string;
  id: string;
  name: string;
  text: string;
  color: string;
  date: Date;
  type: MessageType;
};
