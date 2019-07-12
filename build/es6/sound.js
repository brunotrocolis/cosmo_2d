var cosmo;
(function (cosmo) {
    class Sound {
        constructor(set = {}) {
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
        play() { }
        pause() { }
        replay() {
            this.audio.currentTime = 0;
            this.play();
        }
        setVolume(volume) {
            this.audio.volume = volume;
            this.audio.load();
        }
    }
    cosmo.Sound = Sound;
})(cosmo || (cosmo = {}));
