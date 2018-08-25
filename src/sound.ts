module cosmo {
    export class Sound {
        public VERSION: string = '2.0.0';
        public audio: HTMLAudioElement;

        constructor(set: { [key: string]: any } = {}) {
            var _this = this;
            this.audio = new Audio(set.sound);
            this.audio.onload = function () {
                _this.audio.volume = set.volume || 1;
                _this.audio.loop = set.loop === undefined ? false : set.loop;
                _this.play = _this.audio.play;
                _this.pause = _this.audio.pause;
            }
        }

        public play(): void { }
        public pause(): void { }
        public replay(): void {
            this.audio.currentTime = 0;
            this.play();
        }
        public setVolume(volume: number): void {
            this.audio.volume = volume;
            this.audio.load();
        }

    }
}