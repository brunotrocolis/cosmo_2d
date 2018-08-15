module cosmo {
    export interface IF_Sound {
        audio: HTMLAudioElement;
        play(): void;
        pause(): void;
        replay(): void;
        set_volume(volume: number): void;
    }
    export class Sound implements IF_Sound {
        public audio: HTMLAudioElement;
        constructor(set?: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.audio = set.audio || new HTMLAudioElement();
            this.audio.volume = set.volume || 1;
            this.audio.loop = set.loop === undefined ? false : set.loop;
            this.play = this.audio.play;
            this.pause = this.audio.pause;
        }
        play(): void { }
        pause(): void { }
        replay(): void { 
            this.audio.currentTime = 0;
            this.play();
        }
        set_volume(volume: number): void { 
            this.audio.volume = volume;
            this.audio.load();
        }

    }
}