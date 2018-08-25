var cosmo;
(function (cosmo) {
    var Button = /** @class */ (function () {
        function Button(set) {
            if (set === void 0) { set = {}; }
            this.VERSION = '3.0.0';
            var _this = this;
            this.image = new Image();
            this.image.src = set.image;
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.scale = {
                x: set.scale_x || 1,
                y: set.scale_y || 1
            };
            this.image.onload = function () {
                _this.size = {
                    width: Math.round(_this.image.width / 2),
                    height: _this.image.height
                };
            };
            if (set.press !== void 0) {
                this.press = set.press;
            }
            if (set.hold !== void 0) {
                this.hold = set.hold;
            }
        }
        Button.prototype.press = function () { };
        Button.prototype.hold = function () { };
        Button.prototype.pressed = function () {
            for (var i in cosmo.touch) {
                if (this.x - ((this.size.width * this.scale.x) / 2) < cosmo.touch[i].x &&
                    this.y - ((this.size.height * this.scale.y) / 2) < cosmo.touch[i].y &&
                    this.x + ((this.size.width * this.scale.x) / 2) > cosmo.touch[i].x &&
                    this.y + ((this.size.height * this.scale.y) / 2) > cosmo.touch[i].y)
                    return true;
            }
            return false;
        };
        Button.prototype.update = function () {
            if (cosmo.key[this.key] || this.pressed()) {
                this.active = true;
                this.hold();
            }
            else {
                if (this.active) {
                    this.active = false;
                    this.press();
                }
            }
        };
        Button.prototype.render = function () {
            if (this.size !== void 0) {
                cosmo.game.screen.buffer_context.drawImage(this.image, this.active ? this.size.width : 0, 0, this.size.width, this.size.height, Math.round(this.x - (this.size.width * this.scale.x) / 2), Math.round(this.y - (this.size.height * this.scale.y) / 2), this.size.width * this.scale.x, this.size.height * this.scale.y);
            }
        };
        return Button;
    }());
    cosmo.Button = Button;
})(cosmo || (cosmo = {}));
