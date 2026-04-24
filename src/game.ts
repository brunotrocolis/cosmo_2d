import { state } from './state';
import { Screen } from './screen';
import { Scene } from './scene';

export interface GameOptions {
  screen?: Screen;
  scene?: Scene;
  loop?: () => void;
}

export class Game {
  screen: Screen;
  scene: Scene;

  constructor(set: GameOptions = {}) {
    state.game = this;
    this.screen = set.screen ?? new Screen();
    this.scene = set.scene ?? new Scene();
    if (set.loop) this.loop = set.loop;
  }

  loop(): void {}

  play(): void {
    const tick = () => {
      window.requestAnimationFrame(tick);
      this.update();
      this.render();
      state.time.fps = Math.round(1000 / (performance.now() - state.time.last));
      state.time.last = performance.now();
    };
    state.time.last = performance.now();
    tick();
  }

  update(): void {
    this.loop();
    this.scene.update();
    this.screen.update();
  }

  render(): void {
    this.scene.render();
    this.screen.render();
  }
}
