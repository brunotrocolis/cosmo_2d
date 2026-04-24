import { state } from './state';
import type { Sprite } from './sprite';

export interface BlockFlags {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
}

export interface ActorOptions {
  name?: string;
  x?: number;
  y?: number;
  sprite?: Sprite;
  unique?: boolean;
  persistent?: boolean;
  solid?: boolean;
  start?: (this: Actor) => void;
  loop?: (this: Actor) => void;
  over?: (this: Actor) => void;
  [key: string]: unknown;
}

export class Actor {
  name: string;
  x: number;
  y: number;
  sprite?: Sprite;
  unique: boolean;
  persistent: boolean;
  solid: boolean;
  block: BlockFlags;
  start: () => void;
  loop: () => void;
  over: () => void;
  [key: string]: unknown;

  constructor(set: ActorOptions = {}) {
    this.name = set.name ?? 'Actor';
    this.x = set.x ?? 0;
    this.y = set.y ?? 0;
    this.sprite = set.sprite;
    this.unique = set.unique ?? false;
    this.persistent = set.persistent ?? false;
    this.solid = set.solid ?? true;
    this.block = { left: false, up: false, right: false, down: false };
    this.start = set.start?.bind(this) ?? (() => {});
    this.loop = set.loop?.bind(this) ?? (() => {});
    this.over = set.over?.bind(this) ?? (() => {});

    for (const key of Object.keys(set)) {
      if (!(key in this)) this[key] = set[key];
    }
  }

  on_screen(): boolean {
    const scene = state.game?.scene;
    const screen = state.game?.screen;
    if (!scene || !screen || !this.sprite) return false;
    if (!scene.actor.includes(this)) return false;
    const x1 = this.x - this.sprite.origin.x + scene.x;
    const x2 = this.x + this.sprite.size.width - this.sprite.origin.x + scene.x;
    const y1 = this.y - this.sprite.origin.y + scene.y;
    const y2 = this.y + this.sprite.size.height - this.sprite.origin.y + scene.y;
    return !(x2 < 0 || x1 > screen.size.width || y2 < 0 || y1 > screen.size.height);
  }

  collision(actor?: Actor | string): Actor | false {
    if (!this.sprite) return false;
    if (typeof actor === 'string') {
      const found = this.collision() as Actor | false;
      return found && found.name === actor ? found : false;
    }
    if (actor instanceof Actor) {
      if (!actor.sprite) return false;
      const legX = Math.abs(
        this.sprite.collision.center.x - actor.sprite.collision.center.x
      );
      const legY = Math.abs(
        this.sprite.collision.center.y - actor.sprite.collision.center.y
      );
      const reachX = this.sprite.collision.half.width + actor.sprite.collision.half.width;
      const reachY = this.sprite.collision.half.height + actor.sprite.collision.half.height;
      return legX < reachX && legY < reachY ? actor : false;
    }
    let result: Actor | false = false;
    for (const sceneActor of state.game.scene.actor as Actor[]) {
      if (sceneActor !== this && this.collision(sceneActor)) {
        result = sceneActor;
      }
    }
    return result;
  }

  push(actor?: Actor): void {
    if (!this.sprite) return;
    if (!actor) {
      for (const sceneActor of state.game.scene.actor as Actor[]) this.push(sceneActor);
      return;
    }
    if (!actor.sprite) return;
    const legX = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
    const legY = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
    const reachX = this.sprite.collision.half.width + actor.sprite.collision.half.width;
    const reachY = this.sprite.collision.half.height + actor.sprite.collision.half.height;
    if (legX < reachX && legY < reachY) {
      const overlap = { x: reachX - legX, y: reachY - legY };
      if (overlap.x > overlap.y) {
        actor.y += actor.sprite.collision.center.y <= this.sprite.collision.center.y
          ? -overlap.y
          : overlap.y;
      } else {
        actor.x += actor.sprite.collision.center.x <= this.sprite.collision.center.x
          ? -overlap.x
          : overlap.x;
      }
    }
  }

  update(): void {
    this.loop();
    this.sprite?.update(this.x, this.y);
  }

  render(): void {
    if (this.sprite) this.sprite.render(this.x, this.y);
  }
}
