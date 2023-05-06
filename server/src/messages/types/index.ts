import { EmitEvent } from '../enums';

type Typing = {
  name: string;
  isTyping: boolean;
};
export type Emit = {
  [EmitEvent.MESSAGE]: string;
  [EmitEvent.TYPING]: Typing;
};
