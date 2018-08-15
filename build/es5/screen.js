var cosmo;
(function (cosmo) {
    var Screen = /** @class */ (function () {
        function Screen(set) {
            var set = set || {};
            this.main_canvas = document.createElement('canvas');
            this.buffer_canvas = document.createElement('canvas');
            var content = document.getElementById(set.content) || document.body;
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
            //console.log(this.size);
            this.main_canvas.width = this.buffer_canvas.width = this.size.width;
            this.main_canvas.height = this.buffer_canvas.height = this.size.height;
            this.main_context = this.main_canvas.getContext('2d');
            this.buffer_context = this.buffer_canvas.getContext('2d');
            this.main_canvas.style.width = "100%";
            // this.main_canvas.style.
            content.appendChild(this.main_canvas);
        }
        Screen.prototype.update = function () {
        };
        Screen.prototype.render = function () {
            this.main_context.drawImage(this.buffer_canvas, 0, 0);
            this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
            //console.log("render")
        };
        return Screen;
    }());
    cosmo.Screen = Screen;
})(cosmo || (cosmo = {}));
