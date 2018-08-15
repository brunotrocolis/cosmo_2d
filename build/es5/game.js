var cosmo;
(function (cosmo) {
    var Game = /** @class */ (function () {
        function Game(set) {
            var set = set || {};
            this.screen = set.screen || new cosmo.Screen();
        }
        Game.prototype.loop = function () {
            this.screen.buffer_context.strokeRect(10, 10, 10, 10);
        };
        Game.prototype.play = function () {
            cosmo.play(this);
        };
        return Game;
    }());
    cosmo.Game = Game;
})(cosmo || (cosmo = {}));
