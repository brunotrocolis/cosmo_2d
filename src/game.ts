module cosmo {
    export class Game {

        public screen: Screen;
        public scene: Scene;

        constructor(set?: { [key: string]: any }) {
            cosmo.game = this;
            var set = set || {};
            this.screen = set.screen || new Screen();
            this.scene = set.scene || new Scene();
        }

        loop(): void { }

        play(): void {
            cosmo.play(this);
        }

        update () {
            this.loop();
            this.scene.update();
        }

        render() {
            this.scene.render();
            this.screen.render();
        }
    }
}