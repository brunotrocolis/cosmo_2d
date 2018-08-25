module cosmo {
    export class Actor {

        public VERSION: string = '3.0.0';
        public name: string;
        public x: number;
        public y: number;
        public sprite: Sprite;
        public unique: boolean;
        public persistent: boolean;
        public solid: boolean;
        public block: { [key: string]: any };

        constructor(set: { [key: string]: any } = {}) {
            this.name = set.name || 'Actor';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.sprite = set.sprite || void 0;
            this.unique = set.unique === void 0 ? false : set.unique;
            this.persistent = set.persistent === void 0 ? false : set.persistent;
            this.solid = set.solid === void 0 ? true : set.solid;
            this.block = {
                left: false,
                up: false,
                right: false,
                down: false
            };

            this.start = set.start || function (): void { };
            this.loop = set.loop || function (): void { };
            this.over = set.over || function (): void { };
        }

        public start(): void { }
        public loop(): void { }
        public over(): void { }

        public on_screen(): boolean {
            if (game.scene.actor.indexOf(this) > -1 && this.sprite !== void 0) {
                var x1 = this.x - this.sprite.origin.x + game.scene.x;
                var x2 = this.x + this.sprite.size.width - this.sprite.origin.x + game.scene.x;
                var y1 = this.y - this.sprite.origin.y + game.scene.y;
                var y2 = this.y + this.sprite.size.height - this.sprite.origin.y + game.scene.y;
                if (x2 < 0 || x1 > game.screen.size.width || y2 < 0 || y1 > game.screen.size.height) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        public collision(actor?: any): any {
            if (this.sprite !== undefined) {
                switch (typeof actor) {
                    case 'string':
                        var temp = this.collision();
                        if (temp) {
                            if (temp.name === actor) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    case 'object':
                        if (actor.sprite !== undefined) {
                            var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
                            var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
                            var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
                            var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
                            if (leg_x < reach_x && leg_y < reach_y) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    case 'undefined':
                        game.scene.actor.forEach(scene_actor => {
                            if (this !== scene_actor && this.collision(scene_actor)) {
                                return scene_actor;
                            }
                        });
                        return false;
                }
            } else {
                return false;
            }
        }

        public push(actor?: Actor): void {
            if (this.sprite !== undefined) {
                if (actor === undefined) {
                    game.scene.actor.forEach(scene_actor => {
                        this.push(scene_actor);
                    });
                } else {
                    if (actor.sprite !== undefined) {
                        var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
                        var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
                        var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
                        var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
                        if (leg_x < reach_x && leg_y < reach_y) {
                            var overlap = { x: reach_x - leg_x, y: reach_y - leg_y }
                            if (overlap.x > overlap.y) {
                                if (actor.sprite.collision.center.y <= this.sprite.collision.center.y)
                                    actor.y -= overlap.y;
                                else
                                    actor.y += overlap.y;
                            } else {
                                if (actor.sprite.collision.center.x <= this.sprite.collision.center.x)
                                    actor.x -= overlap.x;
                                else
                                    actor.x += overlap.x;
                            }
                        }
                    }
                }
            }
        }

        public update() {
            this.loop();
            this.sprite.update(this.x, this.y);
        }

        public render() {
            this.sprite.render(this.x, this.y);
        }

    }
}