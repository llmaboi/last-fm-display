import { aquireTrackInfo, ImageObject } from './src/trackInfo';
import { downloadImage } from './src/downloadImage';
import { updateDisplay } from './src/updateDisplay';

let currentImageObject: ImageObject | null = null;

// TODO: figure out how to run program once on startup...
// Run the program on startup.
// let tempImageObject = aquireTrackInfo();

// npx ts-node main.ts

// Run the program every 15 seconds
//  checking for new versions of the image.
setInterval(async () => {
  const tempImageObject = await aquireTrackInfo();

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

        if (!updateDisplay()) {
          throw new Error('Unable to update the display.');
        }

        console.log(
          `Successfully updated image: ${currentImageObject.trackInfo}`
        );
      } catch (err) {
        console.error('Some error occured: ', err);
      }
    }
  }
}, 15 * 1000);

// in debian env `~` directory
// sam_dev@DESKTOP-EOA9AM4:~/last-fm-display/vendor/RGBMatrixEmulator/samples$ python3 rotating-block-generator.py
