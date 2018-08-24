module cosmo {
    export class Button {
        public image: HTMLImageElement;
        public x: number;
        public y: number;
        public scale: { [key: string]: number };
        public key: number;
        public size: { [key: string]: number };
        public active: boolean;

        constructor(set: { [key: string]: any } = {}) {
            var _this = this;
            this.image = new Image();
            this.image.src = set.image;
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.scale = {
                x: set.scale_x || 1,
                y: set.scale_y || 1
            }
            this.image.onload = function () {
                _this.size = {
                    width: Math.round(_this.image.width / 2),
                    height: _this.image.height
                }
            }
            if (set.press !== void 0) {
                this.press = set.press;
            }
            if (set.hold !== void 0) {
                this.hold = set.hold;
            }
        }

        public press(): void { }
        public hold(): void { }

        public pressed(): boolean {
            for (var i in cosmo.touch) {
                if (this.x - ((this.size.width * this.scale.x) / 2) < cosmo.touch[i].x &&
                    this.y - ((this.size.height * this.scale.y) / 2) < cosmo.touch[i].y &&
                    this.x + ((this.size.width * this.scale.x) / 2) > cosmo.touch[i].x &&
                    this.y + ((this.size.height * this.scale.y) / 2) > cosmo.touch[i].y)
                    return true;
            }
            return false;
        }

        public update(): void {
            if (cosmo.key[this.key] || this.pressed()) {
                this.active = true;
                this.hold();
            } else {
                if (this.active) {
                    this.active = false;
                   this.press();
                }
            }
        }
        public render() {
            if (this.size !== void 0) {
                game.screen.buffer_context.drawImage(
                    this.image,
                    this.active ? this.size.width : 0,
                    0,
                    this.size.width,
                    this.size.height,
                    Math.round(this.x - (this.size.width * this.scale.x) / 2),
                    Math.round(this.y - (this.size.height * this.scale.y) / 2),
                    this.size.width * this.scale.x,
                    this.size.height * this.scale.y
                );
            }
        }
    }
}