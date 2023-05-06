import {io} from 'socket.io-client';
export const webSocket = io('http://localhost:3000');
export default webSocket;
