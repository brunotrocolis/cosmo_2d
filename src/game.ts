module cosmo {
    export class Game {

        public screen: Screen;

        constructor(set?: { [key: string]: any }) {
            var set = set || {};
            this.screen = set.screen || new Screen();
        }

        loop(): void {
            this.screen.buffer_context.strokeRect(10, 10, 10, 10);
        }

        play(): void {
            cosmo.play(this);
        }
    }
}