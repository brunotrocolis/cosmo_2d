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
  center: { x: number; y: number };

  constructor(set: BlockOptions) {
    this.x = set.x ?? 0;
    this.y = set.y ?? 0;
    this.size = { width: set.width, height: set.height };
    this.half = { width: set.width / 2, height: set.height / 2 };
    this.center = { x: 0, y: 0 };
  }

  update(): void {
    const scene = state.game.scene;
    this.center.x = this.x + scene.x + this.half.width;
    this.center.y = this.y + scene.y + this.half.height;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const actor of scene.actor as any[]) this._block(actor);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _block(actor: any): void {
    if (!actor.sprite || !actor.solid) return;
    const legX = Math.abs(this.center.x - actor.sprite.collision.center.x);
    const legY = Math.abs(this.center.y - actor.sprite.collision.center.y);
    const reachX = this.half.width + actor.sprite.collision.half.width;
    const reachY = this.half.height + actor.sprite.collision.half.height;
    if (legX < reachX && legY < reachY) {
      const overlapX = reachX - legX;
      const overlapY = reachY - legY;
      if (overlapX > overlapY) {
        if (actor.sprite.collision.center.y <= this.center.y && !actor.block.up) {
          actor.block.up = true;
          actor.y -= overlapY;
        } else if (actor.sprite.collision.center.y > this.center.y && !actor.block.down) {
          actor.block.down = true;
          actor.y += overlapY;
        }
      } else {
        if (actor.sprite.collision.center.x <= this.center.x && !actor.block.left) {
          actor.block.left = true;
          actor.x -= overlapX;
        } else if (actor.sprite.collision.center.x > this.center.x && !actor.block.right) {
          actor.block.right = true;
          actor.x += overlapX;
        }
      }
    }
  }
}
