import * as shell from 'shelljs';

export function updateDisplay(): boolean | void {
  shell.mv('-f', 'images/cover_new.jpg', 'images/cover.jpg');

  shell.cd('vendor/RGBMatrixEmulator/samples/');

  // TODO: Change this function to use the other package command...
  const command = `python3 image-viewer.py ` + `../../../images/cover.jpg`;

  console.log('trying to update display', command);

  if (shell.exec(command).code !== 0) {
    return;
  }

  return true;
}
