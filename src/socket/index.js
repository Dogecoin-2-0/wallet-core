import { io } from 'socket.io-client';

export function instantiateSocket() {
  return io('http://34.111.135.151/');
}
