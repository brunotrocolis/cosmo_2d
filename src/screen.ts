module cosmo {
    export class Screen {

        public main_canvas: HTMLCanvasElement;
        public main_context: CanvasRenderingContext2D;
        public buffer_canvas: HTMLCanvasElement;
        public buffer_context: CanvasRenderingContext2D;
        public size: { [key: string]: any };


        constructor(set?: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.main_canvas = document.createElement('canvas');
            this.main_canvas.setAttribute("style", "display: block; margin: auto; width: 100%; image-rendering: optimizeSpeed; image-rendering: pixelated; image-rendering: pixelated; -ms-interpolation-mode: nearest-neighbor;");
            this.buffer_canvas = document.createElement('canvas');

            var content = document.getElementById(set.content) || document.body;
            content.setAttribute("style", "margin: 0; padding: 0; overflow: hidden;");

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
        }
        render() {
            this.main_context.clearRect(0, 0, this.size.width, this.size.height);
            this.main_context.drawImage(this.buffer_canvas, 0, 0);
            this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
            //console.log("2");
        }
    }
}