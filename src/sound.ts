export interface SoundOptions {
  sound: string;
  volume?: number;
  loop?: boolean;
}

export class Sound {
  private audio: HTMLAudioElement;

  constructor(set: SoundOptions) {
    this.audio = new Audio(set.sound);
    this.audio.volume = set.volume ?? 1;
    this.audio.loop = set.loop ?? false;
  }

  play(): void {
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  replay(): void {
    this.audio.currentTime = 0;
    this.play();
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.audio.load();
  }
}
