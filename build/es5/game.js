var cosmo;
(function (cosmo) {
    var Game = /** @class */ (function () {
        function Game(set) {
            if (set === void 0) { set = {}; }
            this.VERSION = '3.0.0';
            cosmo.game = this;
            this.screen = set.screen || new cosmo.Screen();
            this.scene = set.scene || new cosmo.Scene();
            if (set.loop !== void 0) {
                this.loop = set.loop;
            }
        }
        Game.prototype.loop = function () { };
        Game.prototype.play = function () {
            cosmo.play(this);
        };
        Game.prototype.setScreen = function (screen) {
            this.screen = screen;
        };
        Game.prototype.update = function () {
            this.loop();
            this.scene.update();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.update();
            }
            //
            this.screen.update();
        };
        Game.prototype.render = function () {
            this.scene.render();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.render();
            }
            //
            this.screen.render();
        };
        return Game;
    }());
    cosmo.Game = Game;
})(cosmo || (cosmo = {}));
