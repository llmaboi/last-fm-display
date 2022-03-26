import * as Board from 'rpi-led-matrix-painter';
import { mv } from 'shelljs';

export function updateDisplay(matrix: Board.Painter): boolean | void {
  mv('-f', 'images/cover_new.jpg', 'images/cover.jpg');

  matrix.clear();
  matrix.getCanvas().addCanvasSection(
    new Board.CanvasSection(
      'last-fm-image',
      0,
      0,
      1,
      32,
      32,
      [
        {
          id: 'image',
          drawMode: Board.DrawMode.IMAGE,
          points: { x: 0, y: 0, z: 1 },
          color: 0x800000,
          layer: 1,
          imagePath: './images/cover.jpg',
        },
      ],
      false
    )
  );

  matrix.paint();

  return true;
}
