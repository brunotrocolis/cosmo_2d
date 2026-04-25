import { state } from './state';
import type { Button } from './button';
import type { Actor } from './actor';

export interface ScreenOptions {
  content?: string;
  resolution?: [number, number];
  orientation?: boolean;
  auto_height?: boolean;
  camera_top?: number;
  camera_bottom?: number;
  camera_left?: number;
  camera_right?: number;
  camera_actor?: Actor;
  button?: Button[];
}

export class Screen {
  main_canvas: HTMLCanvasElement;
  buffer_canvas: HTMLCanvasElement;
  main_context: CanvasRenderingContext2D;
  buffer_context: CanvasRenderingContext2D;
  size: {
    device: { width: number; height: number };
    content: { width: number; height: number };
    width: number;
    height: number;
  };
  camera: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    actor?: Actor;
  };
  button: Button[];

  constructor(set: ScreenOptions = {}) {
    this.main_canvas = document.createElement('canvas');
    const pixelatedCss =
      'display:block;margin:auto;width:100%;' +
      '-ms-interpolation-mode:nearest-neighbor;' +
      'image-rendering:-webkit-optimize-contrast;' +
      'image-rendering:-webkit-crisp-edges;' +
      'image-rendering:-moz-crisp-edges;' +
      'image-rendering:-o-crisp-edges;' +
      'image-rendering:pixelated;';
    this.main_canvas.setAttribute('style', pixelatedCss);
    this.buffer_canvas = document.createElement('canvas');

    const content = (set.content ? document.getElementById(set.content) : null) ?? document.body;
    content.setAttribute('style', 'margin:0;padding:0;overflow:hidden;');

    const deviceW = document.documentElement.clientWidth;
    const deviceH = document.documentElement.clientHeight;
    this.size = {
      device: { width: deviceW, height: deviceH },
      content: {
        width: set.content ? content.offsetWidth : deviceW,
        height: set.content ? content.offsetHeight : deviceH,
      },
      width: 0,
      height: 0,
    };

    const resolution = set.resolution ?? [320, 240];
    const landscape =
      set.orientation !== undefined ? set.orientation : deviceW >= deviceH;
    this.size.width = landscape ? resolution[0] : resolution[1];
    this.size.height =
      set.auto_height
        ? this.size.width * (this.size.content.height / this.size.content.width)
        : landscape
          ? resolution[1]
          : resolution[0];

    this.main_canvas.width = this.buffer_canvas.width = this.size.width;
    this.main_canvas.height = this.buffer_canvas.height = this.size.height;
    this.main_context = this.main_canvas.getContext('2d')!;
    this.buffer_context = this.buffer_canvas.getContext('2d')!;
    content.appendChild(this.main_canvas);

    const tb = Math.round(this.size.height * 0.1);
    const lr = Math.round(this.size.width * 0.1);
    this.camera = {
      top: set.camera_top ?? tb,
      bottom: set.camera_bottom ?? tb,
      left: set.camera_left ?? lr,
      right: set.camera_right ?? lr,
      actor: set.camera_actor,
    };
    this.button = set.button ?? [];
  }

  add(element: Button, set: { x?: number; y?: number } = {}): void {
    this.button.push(element);
    if (set.x !== undefined) element.x = set.x;
    if (set.y !== undefined) element.y = set.y;
  }

  update(): void {
    const { actor } = this.camera;
    if (actor) {
      const scene = state.game.scene;
      const sw = this.size.width;
      const sh = this.size.height;
      if (actor.x < this.camera.left - scene.x && scene.x < 0) {
        scene.x = -(actor.x - this.camera.left);
      } else if (
        actor.x > sw - this.camera.right - scene.x &&
        scene.x > -(scene.size.width - sw)
      ) {
        scene.x = -(actor.x - (sw - this.camera.right));
      }
      if (actor.y < this.camera.top - scene.y && scene.y < 0) {
        scene.y = -(actor.y - this.camera.top);
      } else if (
        actor.y > sh - this.camera.bottom - scene.y &&
        scene.y > -(scene.size.height - sh)
      ) {
        scene.y = -(actor.y - (sh - this.camera.bottom));
      }
    }
    this.button.forEach((b) => b.update());
  }

  render(): void {
    this.main_context.clearRect(0, 0, this.size.width, this.size.height);
    this.button.forEach((b) => b.render());
    this.main_context.drawImage(this.buffer_canvas, 0, 0);
    this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
  }
}
