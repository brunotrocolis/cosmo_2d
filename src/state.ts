export interface TimeState {
  fps: number;
  last: number;
}

export interface TouchPoint {
  x: number;
  y: number;
  radius: { x: number; y: number };
  force: number;
  rotation_angle: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const state: {
  game: any;
  time: TimeState;
  key: boolean[];
  touch: TouchPoint[];
} = {
  game: null,
  time: { fps: 60, last: 0 },
  key: [],
  touch: [],
};
