var cosmo;
(function (cosmo) {
    var Sound = /** @class */ (function () {
        function Sound(set) {
            if (set === void 0) { set = {}; }
            this.VERSION = '2.0.0';
            var _this = this;
            this.audio = new Audio(set.sound);
            this.audio.onload = function () {
                _this.audio.volume = set.volume || 1;
                _this.audio.loop = set.loop === undefined ? false : set.loop;
                _this.play = _this.audio.play;
                _this.pause = _this.audio.pause;
            };
        }
        Sound.prototype.play = function () { };
        Sound.prototype.pause = function () { };
        Sound.prototype.replay = function () {
            this.audio.currentTime = 0;
            this.play();
        };
        Sound.prototype.setVolume = function (volume) {
            this.audio.volume = volume;
            this.audio.load();
        };
        return Sound;
    }());
    cosmo.Sound = Sound;
})(cosmo || (cosmo = {}));
