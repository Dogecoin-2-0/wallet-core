import io from 'socket.io-client';
import { PROCESS_ROOT } from '../constants';

export function instantiateSocket() {
  return io(PROCESS_ROOT);
}
