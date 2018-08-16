module cosmo {
    export class Scene {

        public name: string;
        public x: number;
        public y: number;
        public size: { [key: string]: number };
        public actor: Array<Actor>;
        public background: { [key: string]: any };

        constructor(set?: { [key: string]: any }) {
            var set = set || {};
            this.name = set.name || 'Map';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width || cosmo.game.screen.size.width,
                height: set.height || cosmo.game.screen.size.height
            }
            this.actor = set.actor || [];
            this.background = {
                color: set.background_color || "#000000",
                image: set.background_image || [],
                music: set.background_music || null
            }
        }

        update() {
            this.actor.forEach(actor => {
                actor.update();
            });
        }

        render() {
            this.actor.forEach(actor => {
                actor.render();
            });
        }
    }
}