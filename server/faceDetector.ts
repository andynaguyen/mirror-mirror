import * as cv from 'opencv4nodejs';

type VoidReturn = () => void;

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

// classifier options
const options = {
  scaleFactor: 1.1,
  minNeighbors: 8,
  flags: 0,
  minSize: new cv.Size(50, 50),
  maxSize: new cv.Size(300, 300),
};

/**
 * Creates a video capture session via webcam to detect faces.
 */
class FaceDetector {
  private timer: NodeJS.Timer;

  /**
   * Starts video capture session on webcam port 0.
   * @param onDetect callback to execute on face detect
   * @param onFailToDetect optional callback to execute when face is not detected
   */
  public startCapture(onDetect: VoidReturn, onFailToDetect?: VoidReturn) {
    const cap = new cv.VideoCapture(0);
    this.timer = setInterval(() => {
      let frame = cap.read();
      // loop back to start on end of stream reached
      if (frame.empty) {
        cap.reset();
        frame = cap.read();
      }

      // detect faces
      const frameResized = frame.resizeToMax(800);
      const faceRects = classifier.detectMultiScale(
        frameResized.bgrToGray(),
        options.scaleFactor,
        options.minNeighbors,
        options.flags,
        options.minSize,
        options.maxSize,
      ).objects;

      if (faceRects.length > 0) {
        onDetect();
      } else if (onFailToDetect) {
        onFailToDetect();
      }
    }, 1000);
  }

  /**
   * Ends video capture sesssion.
   */
  public endCapture() {
    clearInterval(this.timer);
  }
}

export default FaceDetector;
