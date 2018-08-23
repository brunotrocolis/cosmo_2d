var cosmo;
(function (cosmo) {
    var Game = /** @class */ (function () {
        function Game(set) {
            cosmo.game = this;
            var set = set || {};
            this.screen = set.screen || new cosmo.Screen();
            this.scene = set.scene || new cosmo.Scene();
        }
        Game.prototype.loop = function () { };
        Game.prototype.play = function () {
            cosmo.play(this);
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
