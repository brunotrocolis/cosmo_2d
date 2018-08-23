module cosmo {
    export class Block {
        public x: number;
        public y: number;
        public size: { [key: string]: number };
        public center: { [key: string]: number };
        public half: { [key: string]: number };

        constructor(set: { [key: string]: any } = {}) {
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width,
                height: set.height
            }
            this.half = {
                width: this.size.width / 2,
                height: this.size.height / 2
            }
        }

        public update(): void {
            this.center = {
                x: this.x + game.scene.x + this.half.width,
                y: this.y + game.scene.y + this.half.height
            };
            game.scene.actor.forEach(actor => {
                this.block(actor);
            });

        }

        private block(actor: Actor): void {
            if (actor.sprite !== void 0 && actor.solid) {
                var leg_x = Math.abs(this.center.x - actor.sprite.collision.center.x);
                var leg_y = Math.abs(this.center.y - actor.sprite.collision.center.y);
                var reach_x = this.half.width + actor.sprite.collision.half.width;
                var reach_y = this.half.height + actor.sprite.collision.half.height;
                if (leg_x < reach_x && leg_y < reach_y) {
                    var overlap = { x: reach_x - leg_x, y: reach_y - leg_y }
                    if (overlap.x > overlap.y) {
                        if (actor.sprite.collision.center.y <= this.center.y && !actor.block.up) {
                            actor.block.up = true;
                            actor.y -= overlap.y;
                        } else if (actor.sprite.collision.center.y > this.center.y && !actor.block.down) {
                            actor.block.down = true;
                            actor.y += overlap.y;
                        }
                    } else {
                        if (actor.sprite.collision.center.x <= this.center.x && !actor.block.left) {
                            actor.block.left = true;
                            actor.x -= overlap.x;
                        } else if (actor.sprite.collision.center.x > this.center.x && !actor.block.right) {
                            actor.block.right = true;
                            actor.x += overlap.x;
                        }
                    }
                }
            }
            actor.block = {
                left: false,
                up: false,
                right: false,
                down: false
            };
        }

    }
}