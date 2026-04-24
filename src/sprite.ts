import { state } from './state';

export interface SpriteOptions {
  image?: string;
  animation_frames?: number;
  animation_speed?: number;
  animation_fix?: number | false;
  over_action?: () => void;
  scale_x?: number;
  scale_y?: number;
  rotation?: number;
  opacity?: number;
  origin_x?: number;
  origin_y?: number;
  collision_x?: number;
  collision_y?: number;
  collision_width?: number;
  collision_height?: number;
}

export class Sprite {
  image: HTMLImageElement;
  animation: {
    frames: number;
    speed: number;
    current_frame: number;
    fix: number | false;
    over_action: () => void;
  };
  scale: { x: number; y: number };
  rotation: number;
  opacity: number;
  size: { width: number; height: number };
  origin: { x: number; y: number };
  collision: {
    rect: { x: number; y: number; width: number; height: number };
    half: { width: number; height: number };
    center: { x: number; y: number };
  };

  constructor(set: SpriteOptions = {}) {
    this.image = new Image();
    this.image.src = set.image ?? '';
    this.animation = {
      frames: set.animation_frames ?? 1,
      speed: set.animation_speed ?? 1,
      current_frame: 0,
      fix: set.animation_fix !== undefined ? set.animation_fix : false,
      over_action: set.over_action ?? (() => {}),
    };
    this.scale = { x: set.scale_x ?? 1, y: set.scale_y ?? 1 };
    this.rotation = set.rotation ?? 0;
    this.opacity = set.opacity ?? 1;
    this.size = { width: 0, height: 0 };
    this.origin = { x: 0, y: 0 };
    this.collision = {
      rect: { x: set.collision_x ?? 0, y: set.collision_y ?? 0, width: 0, height: 0 },
      half: { width: 0, height: 0 },
      center: { x: 0, y: 0 },
    };

    this.image.onload = () => {
      this.size = {
        width: this.image.width / this.animation.frames,
        height: this.image.height,
      };
      this.origin = {
        x: set.origin_x ?? Math.round(this.size.width / 2),
        y: set.origin_y ?? Math.round(this.size.height / 2),
      };
      this.collision.rect.width = set.collision_width ?? this.size.width;
      this.collision.rect.height = set.collision_height ?? this.size.height;
      this.collision.half = {
        width: this.collision.rect.width / 2,
        height: this.collision.rect.height / 2,
      };
    };
  }

  update(x: number, y: number): void {
    const scene = state.game.scene;
    this.collision.center.x =
      x + scene.x + this.collision.rect.x + this.collision.half.width - this.origin.x;
    this.collision.center.y =
      y + scene.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
  }

  render(x: number, y: number): void {
    if (!this.image.complete || this.image.naturalWidth === 0) return;
    const { animation } = this;
    let index = 0;

    if (animation.frames > 1) {
      if (animation.fix !== false) {
        index = animation.fix;
      } else {
        const nextFrame =
          animation.current_frame + animation.speed * (animation.frames / state.time.fps);
        if (nextFrame >= animation.frames) {
          animation.current_frame = 0;
          animation.over_action();
        } else {
          animation.current_frame = nextFrame;
        }
        index = Math.floor(animation.current_frame);
      }
    }

    const scene = state.game.scene;
    const buffer = state.game.screen.buffer_context as CanvasRenderingContext2D;
    buffer.save();
    buffer.translate(x + scene.x, y + scene.y);
    buffer.rotate((Math.PI / 180) * this.rotation);
    buffer.globalAlpha = this.opacity;
    buffer.drawImage(
      this.image,
      index * this.size.width,
      0,
      this.size.width,
      this.size.height,
      -this.origin.x,
      -this.origin.y,
      this.size.width * this.scale.x,
      this.size.height * this.scale.y
    );
    buffer.restore();
  }
}
