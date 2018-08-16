module cosmo {
    export class Actor {

        public name: string;
        public x: number;
        public y: number;
        public sprite: Sprite;
        public unique: boolean;
        public persistent: boolean;
        public solid: boolean;

        constructor(set: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.name = set.name || 'Actor';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.sprite = set.sprite || null;
            this.unique = set.unique === undefined ? false : set.unique;
            this.persistent = set.persistent === undefined ? false : set.persistent;
            this.solid = set.solid === undefined ? false : set.solid;

            this.start = set.start || function (): void { };
            this.loop = set.loop || function (): void { };
            this.over = set.over || function (): void { };
        }

        public start(): void { }
        public loop(): void { }
        public over(): void { }

        public update() {
            this.loop();
            this.sprite.update(this.x, this.y);
        }

        public render() {
            this.sprite.render(this.x, this.y);
        }

    }
}