import { Socket } from 'socket.io';
import createDebug from 'debug';
import FaceDetector from './faceDetector';
import { events } from '../common/socket';

const debug = createDebug('socket');

/**
 * Handles new incoming websocket connections by starting a video capture session to detect faces.
 * @param socket socket connection
 */
const handleConnection = (socket: Socket) => {
  debug('new connection: ', socket.id);
  const detector = new FaceDetector();
  const onDetect = () => {
    debug('face detected - emitting true');
    socket.emit(events.FACE_DETECTED, true);
  };
  const onFailToDetect = () => {
    debug('no face detected - emitting false');
    socket.emit(events.FACE_DETECTED, false);
  };

  detector.startCapture(onDetect, onFailToDetect);
  socket.on(events.DISCONNECT, () => {
    debug('disconnect: ', socket.id);
    detector.endCapture();
  });
};

export default handleConnection;
