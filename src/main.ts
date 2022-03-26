import { acquireTrackInfo as acquireTrackInfo, ImageObject } from './trackInfo';
import { downloadImage } from './downloadImage';
import { updateDisplay } from './updateDisplay';
import { createMatrix } from './createMatrix';

let currentImageObject: ImageObject | null = null;
const matrix = createMatrix();

// TODO: figure out how to run program once on startup...
// Run the program on startup.
// let tempImageObject = acquireTrackInfo();

// tsc --build
// node dist/main.js

// Run the program every 15 seconds
//  checking for new versions of the image.
setInterval(async () => {
  const tempImageObject = await acquireTrackInfo();

  if (tempImageObject) {
    if (
      !currentImageObject ||
      (currentImageObject &&
        currentImageObject.trackInfo !== tempImageObject.trackInfo)
    ) {
      currentImageObject = tempImageObject;
      try {
        const newImageDownloaded = await downloadImage(
          currentImageObject.imageUrl
        );

        if (!newImageDownloaded) {
          throw new Error('No image downloaded.');
        }

        if (!updateDisplay(matrix)) {
          throw new Error('Unable to update the display.');
        }

        console.log(
          `Successfully updated image: ${currentImageObject.trackInfo}`
        );
      } catch (err) {
        console.error('Some error occurred: ', err);
      }
    }
  }
}, 15 * 1000);

// in debian env `~` directory
// sam_dev@DESKTOP-EOA9AM4:~/last-fm-display/vendor/RGBMatrixEmulator/samples$ python3 rotating-block-generator.py
