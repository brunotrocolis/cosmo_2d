import { state } from './state';

export interface ButtonOptions {
  image?: string;
  x?: number;
  y?: number;
  scale_x?: number;
  scale_y?: number;
  key?: number;
  press?: () => void;
  hold?: () => void;
}

export class Button {
  image: HTMLImageElement;
  x: number;
  y: number;
  scale: { x: number; y: number };
  key?: number;
  active: boolean;
  size!: { width: number; height: number };

  constructor(set: ButtonOptions = {}) {
    this.image = new Image();
    this.image.src = set.image ?? '';
    this.x = set.x ?? 0;
    this.y = set.y ?? 0;
    this.scale = { x: set.scale_x ?? 1, y: set.scale_y ?? 1 };
    this.key = set.key;
    this.active = false;
    this.image.onload = () => {
      this.size = { width: Math.round(this.image.width / 2), height: this.image.height };
    };
    if (set.press) this.press = set.press;
    if (set.hold) this.hold = set.hold;
  }

  press(): void {}
  hold(): void {}

  private pressed(): boolean {
    if (!this.size) return false;
    for (const touch of state.touch) {
      const halfW = (this.size.width * this.scale.x) / 2;
      const halfH = (this.size.height * this.scale.y) / 2;
      if (
        touch.x > this.x - halfW &&
        touch.x < this.x + halfW &&
        touch.y > this.y - halfH &&
        touch.y < this.y + halfH
      ) {
        return true;
      }
    }
    return false;
  }

  update(): void {
    if (state.key[this.key!] || this.pressed()) {
      this.active = true;
      this.hold();
    } else if (this.active) {
      this.active = false;
      this.press();
    }
  }

  render(): void {
    if (!this.size) return;
    const buffer = state.game.screen.buffer_context as CanvasRenderingContext2D;
    buffer.drawImage(
      this.image,
      this.active ? this.size.width : 0,
      0,
      this.size.width,
      this.size.height,
      Math.round(this.x - (this.size.width * this.scale.x) / 2),
      Math.round(this.y - (this.size.height * this.scale.y) / 2),
      this.size.width * this.scale.x,
      this.size.height * this.scale.y
    );
  }
}
