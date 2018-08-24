module cosmo {
    export class Game {

        public screen: Screen;
        public scene: Scene;

        constructor(set: { [key: string]: any } = {}) {
            cosmo.game = this;
            this.screen = set.screen || new Screen();
            this.scene = set.scene || new Scene();
            if (set.loop !== void 0) { this.loop = set.loop }
        }

        public loop(): void { }

        public play(): void {
            cosmo.play(this);
        }

        public setScreen(screen: Screen): void {
            this.screen = screen;
        }

        public update(): void {
            this.loop();
            this.scene.update();
            // Test:
            if (test.active) {
                test.update();
            }
            //
            this.screen.update();
        }

        public render(): void {
            this.scene.render();
            // Test:
            if (test.active) {
                test.render();
            }
            //
            this.screen.render();
        }
    }
}