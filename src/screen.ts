module cosmo {
    export class Screen {

        public main_canvas: HTMLCanvasElement;
        public main_context: CanvasRenderingContext2D;
        public buffer_canvas: HTMLCanvasElement;
        public buffer_context: CanvasRenderingContext2D;
        public size: { [key: string]: any };
        public camera: { [key: string]: any };

        constructor(set?: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.main_canvas = document.createElement('canvas');
            var css = "display: block;" +
                "margin: auto;" +
                "width: 100%;" +
                "-ms-interpolation-mode: nearest-neighbor;" +
                "image-rendering: -webkit-optimize-contrast;" +
                "image-rendering: -webkit-crisp-edges;" +
                "image-rendering: -moz-crisp-edges;" +
                "image-rendering: -o-crisp-edges; " +
                "image-rendering: pixelated;";
            this.main_canvas.setAttribute("style", css);
            this.buffer_canvas = document.createElement('canvas');
            var content = document.getElementById(set.content) || document.body;
            css = "margin: 0;" +
                "padding: 0;" +
                "overflow: hidden;"
            content.setAttribute("style", css);
            this.size = {
                device: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                },
                content: {
                    width: set.content === undefined ? document.documentElement.clientWidth : content.offsetWidth,
                    height: set.content === undefined ? document.documentElement.clientHeight : content.offsetHeight
                }
            };
            var resolution = set.resolution || cosmo.QVGA;
            var orientation = set.orientation || document.documentElement.clientWidth >= document.documentElement.clientHeight;
            this.size.width = orientation ? resolution[0] : resolution[1];
            this.size.height =
                (set.auto_height === undefined) || (set.auto_height === false) ?
                    (orientation ? resolution[1] : resolution[0]) :
                    (this.size.width * (this.size.content.height / this.size.content.width));
            this.main_canvas.width = this.buffer_canvas.width = this.size.width;
            this.main_canvas.height = this.buffer_canvas.height = this.size.height;
            this.main_context = this.main_canvas.getContext('2d');
            this.buffer_context = this.buffer_canvas.getContext('2d');
            content.appendChild(this.main_canvas);
            var top_bottom = Math.round(this.size.height * 0.1);
            var left_right = Math.round(this.size.width * 0.1);
            this.camera = {
                top: set.camera_top || top_bottom,
                bottom: set.camera_bottom || top_bottom,
                left: set.camera_left || left_right,
                right: set.camera_right || left_right,
                actor: set.camera_actor || undefined
            };
        }

        public update(): void {
            if (this.camera.actor !== undefined) {
                if (this.camera.actor.x < this.camera.left - game.scene.x && game.scene.x < 0) {
                    game.scene.x = -(this.camera.actor.x - this.camera.left);
                } else if (this.camera.actor.x > (this.size.width - this.camera.right) - game.scene.x && game.scene.x > -(game.scene.size.width - this.size.width)) {
                    game.scene.x = -(this.camera.actor.x - (this.size.width - this.camera.right));
                }
                if (this.camera.actor.y < this.camera.top - game.scene.y && game.scene.y < 0) {
                    game.scene.y = -(this.camera.actor.y - this.camera.top);
                } else if (this.camera.actor.y > (this.size.height - this.camera.bottom) - game.scene.y && game.scene.y > -(game.scene.size.height - this.size.height)) {
                    game.scene.y = -(this.camera.actor.y - (this.size.height - this.camera.bottom));
                }
            }
        }

        public render(): void {
            this.main_context.clearRect(0, 0, this.size.width, this.size.height);
            this.main_context.drawImage(this.buffer_canvas, 0, 0);
            this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
        }
    }
}