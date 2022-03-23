import axios from 'axios';
import { createWriteStream } from 'fs';

export async function downloadImage(imageUrl: string): Promise<void | boolean> {
  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  });
  const writer = createWriteStream('images/cover_new.jpg');

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      resolve(true);
    });
    writer.on('error', reject);
  });
}
