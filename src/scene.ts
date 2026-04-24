import { state } from './state';
import { Actor } from './actor';
import type { Tiles } from './tiles';

export interface SceneOptions {
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  actor?: Actor[];
  tiles?: [Tiles[], Tiles[]];
  background_color?: string;
  background_image?: string[];
  background_music?: string | null;
}

export class Scene {
  name: string;
  x: number;
  y: number;
  size: { width: number; height: number };
  actor: Actor[];
  tiles: [Tiles[], Tiles[]];
  background: { color: string; image: string[]; music: string | null };

  constructor(set: SceneOptions = {}) {
    this.name = set.name ?? 'Map';
    this.x = set.x ?? 0;
    this.y = set.y ?? 0;
    this.size = {
      width: set.width ?? state.game.screen.size.width,
      height: set.height ?? state.game.screen.size.height,
    };
    this.actor = [];
    if (set.actor) set.actor.forEach((a) => this.add(a));
    this.tiles = set.tiles ?? [[], []];
    this.background = {
      color: set.background_color ?? '#FFFFFF',
      image: set.background_image ?? [],
      music: set.background_music ?? null,
    };
  }

  add(element: Actor | Tiles, set: { x?: number; y?: number; layer?: number } = {}): void {
    if (element instanceof Actor) {
      const actor = element.unique ? element : Object.assign(new Actor(), element);
      this.actor.push(actor);
      actor.start();
      actor.x = set.x ?? actor.x;
      actor.y = set.y ?? actor.y;
    } else {
      this.tiles[set.layer ?? 0].push(element);
    }
  }

  update(): void {
    this.actor.forEach((a) => a.update());
    this.tiles[0].forEach((t) => t.update());
    this.tiles[1].forEach((t) => t.update());
  }

  render(): void {
    this.tiles[0].forEach((t) => t.render());
    this.actor.forEach((a) => a.render());
    this.tiles[1].forEach((t) => t.render());
  }
}
