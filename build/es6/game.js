var cosmo;
(function (cosmo) {
    class Game {
        constructor(set = {}) {
            this.VERSION = '3.0.0';
            cosmo.game = this;
            this.screen = set.screen || new cosmo.Screen();
            this.scene = set.scene || new cosmo.Scene();
            if (set.loop !== void 0) {
                this.loop = set.loop;
            }
        }
        loop() { }
        play() {
            cosmo.play(this);
        }
        setScreen(screen) {
            this.screen = screen;
        }
        update() {
            this.loop();
            this.scene.update();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.update();
            }
            //
            this.screen.update();
        }
        render() {
            this.scene.render();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.render();
            }
            //
            this.screen.render();
        }
    }
    cosmo.Game = Game;
})(cosmo || (cosmo = {}));
