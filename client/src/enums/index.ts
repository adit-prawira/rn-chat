export enum MessageEvent {
  CREATE_MESSAGE = 'create-message',
  FIND_MESSAGES = 'find-messages',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
  TYPING = 'typing',
  MESSAGE = 'message',
}

export enum EmitEvent {
  MESSAGE = 'message',
  TYPING = 'typing',
}
