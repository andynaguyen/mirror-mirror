import { Socket } from 'socket.io';

/**
 * Handles incoming websocket connections.
 * @param socket socket connection
 */
const handleConnection = (socket: Socket) => {
  socket.emit('message', 'welcome');
};

export default handleConnection;
