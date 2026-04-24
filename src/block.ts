import { state } from './state';

export interface BlockOptions {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

export class Block {
  x: number;
  y: number;
  size: { width: number; height: number };
  half: { width: number; height: number };
  center!: { x: number; y: number };

  constructor(set: BlockOptions) {
    this.x = set.x ?? 0;
    this.y = set.y ?? 0;
    this.size = { width: set.width, height: set.height };
    this.half = { width: set.width / 2, height: set.height / 2 };
  }

  update(): void {
    const scene = state.game.scene;
    this.center = {
      x: this.x + scene.x + this.half.width,
      y: this.y + scene.y + this.half.height,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scene.actor.forEach((actor: any) => this._block(actor));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _block(actor: any): void {
    if (!actor.sprite || !actor.solid) return;
    const legX = Math.abs(this.center.x - actor.sprite.collision.center.x);
    const legY = Math.abs(this.center.y - actor.sprite.collision.center.y);
    const reachX = this.half.width + actor.sprite.collision.half.width;
    const reachY = this.half.height + actor.sprite.collision.half.height;
    if (legX < reachX && legY < reachY) {
      const overlap = { x: reachX - legX, y: reachY - legY };
      if (overlap.x > overlap.y) {
        if (actor.sprite.collision.center.y <= this.center.y && !actor.block.up) {
          actor.block.up = true;
          actor.y -= overlap.y;
        } else if (actor.sprite.collision.center.y > this.center.y && !actor.block.down) {
          actor.block.down = true;
          actor.y += overlap.y;
        }
      } else {
        if (actor.sprite.collision.center.x <= this.center.x && !actor.block.left) {
          actor.block.left = true;
          actor.x -= overlap.x;
        } else if (actor.sprite.collision.center.x > this.center.x && !actor.block.right) {
          actor.block.right = true;
          actor.x += overlap.x;
        }
      }
    }
    actor.block = { left: false, up: false, right: false, down: false };
  }
}
