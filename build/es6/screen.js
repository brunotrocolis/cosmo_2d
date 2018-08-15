var cosmo;
(function (cosmo) {
    class Screen {
        constructor(set) {
            var set = set || {};
            this.main_canvas = document.createElement('canvas');
            this.buffer_canvas = document.createElement('canvas');
            set.resolution = set.resolution || cosmo.QVGA;
            var content = cosmo.res(set.content) || document.body;
            this.size = {};
            this.size.device_width = document.documentElement.clientWidth;
            this.size.device_height = document.documentElement.clientHeight;
            this.size.content_width = set.content === undefined ? this.size.device_width : content.offsetWidth;
            this.size.content_height = set.content === undefined ? this.size.device_height : content.offsetHeight;
            var temp = this.size.content_width >= this.size.content_height;
            this.size.width = temp ? set.resolution[0] : set.resolution[1];
            this.size.height =
                (set.auto_height === undefined) || (set.auto_height === false) ?
                    (temp ? set.resolution[1] : set.resolution[0]) :
                    (this.size.width * (this.size.content_height / this.size.content_width));
            this.main_canvas.width = this.buffer_canvas.width = this.size.width;
            this.main_canvas.height = this.buffer_canvas.height = this.size.height;
            this.main_context = this.main_canvas.getContext('2d');
            this.buffer_context = this.buffer_canvas.getContext('2d');
            content.appendChild(this.main_canvas);
        }
        draw_image() {
        }
        draw_text() {
        }
        update() {
        }
        render() {
            this.main_context.drawImage(this.buffer_canvas, 0, 0);
        }
    }
    cosmo.Screen = Screen;
})(cosmo || (cosmo = {}));
