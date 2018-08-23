module cosmo {
    export class Scene {

        public name: string;
        public x: number;
        public y: number;
        public size: { [key: string]: number };
        public actor: Array<Actor>;
        public tiles: Tiles[][];
        public background: { [key: string]: any };

        constructor(set: { [key: string]: any } = {}) {
            this.name = set.name || 'Map';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width || cosmo.game.screen.size.width,
                height: set.height || cosmo.game.screen.size.height
            }
            this.actor = [];
            if (set.actor !== undefined) {
                set.actor.forEach(actor => {
                    this.add(actor);
                });
            }
            this.tiles = set.tiles || [[],[]];
            this.background = {
                color: set.background_color || "#FFFFFF",
                image: set.background_image || [],
                music: set.background_music || null
            }
        }

        public add(element: any, set: { [key: string]: any } = {}) {
            switch (Object.getPrototypeOf(element)) {
                case cosmo.Actor.prototype:
                    if (element.unique)
                        this.actor.push(element);
                    else
                        this.actor.push((<any>Object).assign(new cosmo.Actor(), element));
                    var actor: Actor = this.actor[this.actor.length - 1];
                    actor.start();
                    actor.x = set[0] || set.x || actor.x;
                    actor.y = set[1] || set.y || actor.y;
                    break;
                case cosmo.Tiles.prototype:
                    this.tiles[set.layer || 0].push(element);
                    break;
            }
        }

        public update(): void {
            
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

        public render(): void {
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
}