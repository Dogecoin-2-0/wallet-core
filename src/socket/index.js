import io from 'socket.io-client';

export function instantiateSocket() {
  return io('http://34.122.201.86:3600');
}
