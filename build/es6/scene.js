var cosmo;
(function (cosmo) {
    class Scene {
        constructor(set = {}) {
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
                set.actor.forEach(actor => {
                    this.add(actor);
                });
            }
            this.tiles = set.tiles || [[], []];
            this.background = {
                color: set.background_color || "#FFFFFF",
                image: set.background_image || [],
                music: set.background_music || null
            };
        }
        add(element, set = {}) {
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
        }
        update() {
            this.actor.forEach(actor => {
                actor.update();
            });
            this.tiles[0].forEach(tiles => {
                tiles.update();
            });
            this.tiles[1].forEach(tiles => {
                tiles.update();
            });
        }
        render() {
            //game.screen.buffer_context.fillStyle = this.background.color;
            //game.screen.buffer_context.fillRect(0, 0, game.screen.size.width, game.screen.size.height);
            this.tiles[0].forEach(tiles => {
                tiles.render();
            });
            this.actor.forEach(actor => {
                actor.render();
            });
            this.tiles[1].forEach(tiles => {
                tiles.render();
            });
        }
    }
    cosmo.Scene = Scene;
})(cosmo || (cosmo = {}));
