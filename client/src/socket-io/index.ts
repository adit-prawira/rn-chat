import {Platform} from 'react-native';
import {io} from 'socket.io-client';
export const webSocket = io(
  Platform.OS == 'android' ? 'http://10.0.2.2:3000' : 'ws://localhost:3000',
);
export default webSocket;
