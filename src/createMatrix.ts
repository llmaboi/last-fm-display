import * as Board from 'rpi-led-matrix-painter';

export function createMatrix(): Board.Painter {
  const matrix = new Board.Painter(
    {
      ...Board.RpiLedMatrix.LedMatrix.defaultMatrixOptions(),
      rows: 32,
      cols: 32,
      chainLength: 1,
      hardwareMapping: Board.RpiLedMatrix.GpioMapping.AdafruitHat,
      brightness: 65,
      disableHardwarePulsing: true,
    },
    {
      ...Board.RpiLedMatrix.LedMatrix.defaultRuntimeOptions(),
    }
  );

  return matrix;
}
