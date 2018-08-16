module cosmo {
    export class Sprite {

        public image: HTMLImageElement;
        public size: { [key: string]: number };
        public animation: { [key: string]: any };
        public scale: { [key: string]: number };
        public rotation: number;
        public opacity: number;
        public visible: boolean;
        public origin: { [key: string]: number };
        public collision: { [key: string]: any };

        constructor(set?: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.image = new Image(set.width, set.height);
            this.image.src = set.image || null;
            this.animation = {
                frames: set.animation_frames || 1,
                speed: set.animation_speed || 1,
                current_frame: 0,
                fix: set.animation_fix || false,
                over_action: set.over_action || function () { }
            }
            this.size = {
                width: this.image.width / this.animation.frames,
                height: this.image.height
            }
            this.scale = {
                x: set.scale_x || 1,
                y: set.scale_y || 1
            }
            this.rotation = set.rotation || 0;
            this.opacity = set.opacity || 1;
            this.origin = {
                x: set.origin_x || Math.round(this.size.width / 2),
                y: set.origin_y || Math.round(this.size.height / 2)
            }
            this.collision = {
                rect: {},
                half: null,
                center: {
                    x: 0,
                    y: 0
                }
            };
            this.collision.rect.x = set.collision_x || 0;
            this.collision.rect.y = set.collision_y || 0;
            this.collision.rect.width = set.collision_width || this.size.width;
            this.collision.rect.height = set.collision_height || this.size.height;
            this.collision.half = {
                width: this.collision.rect.width / 2,
                height: this.collision.rect.height / 2
            };
        }

        update(x: number, y: number) {
            this.collision.center.x = x + cosmo.game.scene.x + this.collision.rect.x + this.collision.half.width - this.origin.x;
            this.collision.center.y = y + cosmo.game.scene.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
        }

        render(x: number, y: number) {
            var index = 0, next_frame = 0;
            if (this.animation.frames === 1)
                index = 0;
            else if (this.animation.fix !== false)
                index = this.animation.fix;
            else {
                next_frame = this.animation.current_frame + this.animation.speed * (this.animation.frames / cosmo.time.fps);
                if (next_frame >= this.animation.frames) {
                    this.animation.current_frame = 0;
                    if (this.animation.endAction) this.animation.endAction();
                } else
                    this.animation.current_frame = next_frame;
                index = Math.floor(this.animation.current_frame);
            }
            var buffer =  cosmo.game.screen.buffer_context;
            buffer.save();
            buffer.translate(x + cosmo.game.scene.x, y + cosmo.game.scene.y);
            buffer.rotate(Math.PI / 180 * this.rotation);
            buffer.globalAlpha = this.opacity;
            buffer.drawImage(
                this.image,
                index * this.size.width,
                0,
                this.size.width,
                this.size.height,
                -this.origin.x,
                -this.origin.y,
                this.size.width * this.scale.x,
                this.size.height * this.scale.y
            );
            buffer.restore();
            //console.log('1');
        }
    }
}