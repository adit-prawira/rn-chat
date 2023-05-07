import {io} from 'socket.io-client';
export const webSocket = io('ws://localhost:3000');
export default webSocket;
