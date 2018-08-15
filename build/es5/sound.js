var cosmo;
(function (cosmo) {
    var Sound = /** @class */ (function () {
        function Sound(set) {
            var set = set || {};
            this.audio = set.audio || new HTMLAudioElement();
            this.audio.volume = set.volume || 1;
            this.audio.loop = set.loop === undefined ? false : set.loop;
            this.play = this.audio.play;
            this.pause = this.audio.pause;
        }
        Sound.prototype.play = function () { };
        Sound.prototype.pause = function () { };
        Sound.prototype.replay = function () {
            this.audio.currentTime = 0;
            this.play();
        };
        Sound.prototype.set_volume = function (volume) {
            this.audio.volume = volume;
            this.audio.load();
        };
        return Sound;
    }());
    cosmo.Sound = Sound;
})(cosmo || (cosmo = {}));
