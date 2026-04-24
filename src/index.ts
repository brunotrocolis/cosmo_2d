import { state } from './state';
export { state };

export { Game } from './game';
export { Screen } from './screen';
export { Scene } from './scene';
export { Actor } from './actor';
export { Sprite } from './sprite';
export { Block } from './block';
export { Tiles } from './tiles';
export { Button } from './button';
export { Sound } from './sound';
export { Analog } from './analog';

// Resolution presets
export const QQVGA: [number, number] = [160, 120];
export const HQVGA: [number, number] = [240, 160];
export const QVGA: [number, number] = [320, 240];
export const WQVGA: [number, number] = [400, 240];
export const HVGA: [number, number] = [480, 320];
export const nHD: [number, number] = [640, 360];
export const VGA: [number, number] = [640, 480];
export const WVGA: [number, number] = [800, 480];
export const FWVGA: [number, number] = [854, 480];
export const qHD: [number, number] = [960, 540];
export const DVGA: [number, number] = [960, 640];
export const SVGA: [number, number] = [800, 600];
export const WSVGA: [number, number] = [1024, 600];
export const XGA: [number, number] = [1024, 768];
export const WXGA: [number, number] = [1280, 720];
export const HD: [number, number] = [1280, 720];
export const SXGA: [number, number] = [1280, 1024];
export const FHD: [number, number] = [1920, 1080];
export const FULL_HD: [number, number] = [1920, 1080];
export const WQHD: [number, number] = [2560, 1440];

export const LANDSCAPE = false;
export const PORTRAIT = true;

export const VERSION = '3.0.1';

// Re-export time, key, touch as convenience aliases to state
export const time = state.time;
export const key = state.key;
export const touch = state.touch;

// Keyboard input
window.addEventListener('keydown', (e) => { state.key[e.keyCode] = true; });
window.addEventListener('keyup', (e) => { state.key[e.keyCode] = false; });

// Touch input
function processTouches(event: TouchEvent): void {
  const screen = state.game?.screen;
  for (let i = 0; i < event.changedTouches.length; i++) {
    const t = event.changedTouches[i];
    state.touch[i] = {
      x: screen
        ? Math.round(t.clientX * (screen.size.width / screen.size.content.width))
        : t.clientX,
      y: screen
        ? Math.round(t.clientY * (screen.size.height / screen.size.content.height))
        : t.clientY,
      radius: { x: t.radiusX, y: t.radiusY },
      force: t.force,
      rotation_angle: t.rotationAngle,
    };
  }
}

document.addEventListener('touchstart', processTouches);
document.addEventListener('touchmove', processTouches);
document.addEventListener('touchend', (e) => {
  processTouches(e);
  state.touch = [];
});
