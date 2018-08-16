var cosmo;
(function (cosmo) {
    var Scene = /** @class */ (function () {
        function Scene(set) {
            var set = set || {};
            this.name = set.name || 'Map';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width || cosmo.game.screen.size.width,
                height: set.height || cosmo.game.screen.size.height
            };
            this.actor = set.actor || [];
            this.background = {
                color: set.background_color || "#000000",
                image: set.background_image || [],
                music: set.background_music || null
            };
        }
        Scene.prototype.update = function () {
            this.actor.forEach(function (actor) {
                actor.update();
            });
        };
        Scene.prototype.render = function () {
            this.actor.forEach(function (actor) {
                actor.render();
            });
        };
        return Scene;
    }());
    cosmo.Scene = Scene;
})(cosmo || (cosmo = {}));
