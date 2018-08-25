var cosmo;
(function (cosmo) {
    var Scene = /** @class */ (function () {
        function Scene(set) {
            if (set === void 0) { set = {}; }
            var _this = this;
            this.VERSION = '3.0.0';
            this.name = set.name || 'Map';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width || cosmo.game.screen.size.width,
                height: set.height || cosmo.game.screen.size.height
            };
            this.actor = [];
            if (set.actor !== undefined) {
                set.actor.forEach(function (actor) {
                    _this.add(actor);
                });
            }
            this.tiles = set.tiles || [[], []];
            this.background = {
                color: set.background_color || "#FFFFFF",
                image: set.background_image || [],
                music: set.background_music || null
            };
        }
        Scene.prototype.add = function (element, set) {
            if (set === void 0) { set = {}; }
            switch (Object.getPrototypeOf(element)) {
                case cosmo.Actor.prototype:
                    if (element.unique)
                        this.actor.push(element);
                    else
                        this.actor.push(Object.assign(new cosmo.Actor(), element));
                    var actor = this.actor[this.actor.length - 1];
                    actor.start();
                    actor.x = set[0] || set.x || actor.x;
                    actor.y = set[1] || set.y || actor.y;
                    break;
                case cosmo.Tiles.prototype:
                    this.tiles[set.layer || 0].push(element);
                    break;
            }
        };
        Scene.prototype.update = function () {
            this.actor.forEach(function (actor) {
                actor.update();
            });
            this.tiles[0].forEach(function (tiles) {
                tiles.update();
            });
            this.tiles[1].forEach(function (tiles) {
                tiles.update();
            });
        };
        Scene.prototype.render = function () {
            //game.screen.buffer_context.fillStyle = this.background.color;
            //game.screen.buffer_context.fillRect(0, 0, game.screen.size.width, game.screen.size.height);
            this.tiles[0].forEach(function (tiles) {
                tiles.render();
            });
            this.actor.forEach(function (actor) {
                actor.render();
            });
            this.tiles[1].forEach(function (tiles) {
                tiles.render();
            });
        };
        return Scene;
    }());
    cosmo.Scene = Scene;
})(cosmo || (cosmo = {}));
