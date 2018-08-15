var cosmo;
(function (cosmo) {
    class Sound {
        constructor(set) {
            var set = set || {};
            this.audio = set.audio || new HTMLAudioElement();
            this.audio.volume = set.volume || 1;
            this.audio.loop = set.loop === undefined ? false : set.loop;
            this.play = this.audio.play;
            this.pause = this.audio.pause;
        }
        play() { }
        pause() { }
        replay() {
            this.audio.currentTime = 0;
            this.play();
        }
        set_volume(volume) {
            this.audio.volume = volume;
            this.audio.load();
        }
    }
    cosmo.Sound = Sound;
})(cosmo || (cosmo = {}));
