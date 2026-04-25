import * as cosmo from '../src/index';

const screen = new cosmo.Screen({ auto_height: true });
const game = new cosmo.Game({ screen });

const hero = new cosmo.Actor({
  name: 'Herói',
  x: 50,
  y: 50,
  unique: true,
  start() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const self = this as any;
    self.speed = 2;
    const spriteOpts = {
      collision_x: 2,
      collision_y: 14,
      collision_width: 11,
      collision_height: 11,
      animation_frames: 4,
    };
    self.sprites = {
      up: new cosmo.Sprite({ image: '../resources/sprites/up.png', ...spriteOpts }),
      down: new cosmo.Sprite({ image: '../resources/sprites/down.png', ...spriteOpts }),
      left: new cosmo.Sprite({ image: '../resources/sprites/left.png', ...spriteOpts }),
      right: new cosmo.Sprite({ image: '../resources/sprites/right.png', ...spriteOpts }),
    };
    self.sprite = self.sprites.down;
  },
  loop() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const self = this as any;
    const { key } = cosmo;
    if (key[65]) { self.sprite = self.sprites.left; self.x -= self.speed; }
    else if (key[68]) { self.sprite = self.sprites.right; self.x += self.speed; }
    if (key[87]) { self.sprite = self.sprites.up; self.y -= self.speed; }
    else if (key[83]) { self.sprite = self.sprites.down; self.y += self.speed; }
  },
});

const tiles = new cosmo.Tiles({
  image: '../resources/tiles/tiles.png',
  rows: 2,
  columns: 3,
  block: [
    [true, true, true],
    [true, true, false],
  ],
  matrix: [
    [0, 0, 0, 100], [0, 0, 15, 100], [2, 0, 30, 100],
    [0, 1, 0, 115], [0, 1, 15, 115], [0, 1, 30, 115],
    [0, 1, 0, 130], [0, 1, 15, 130], [0, 1, 30, 130],
    [0, 0, 45, 130], [0, 0, 150, 50], [2, 1, 200, 50],
  ],
});

const button = new cosmo.Button({
  image: '../resources/buttons/button_play_1.png',
  x: 200,
  y: 100,
  scale_x: 0.5,
  scale_y: 0.5,
  press() { console.log('Pressionado!'); },
  hold() { console.log('Segurando!'); },
});

game.screen.add(button);
game.scene = new cosmo.Scene({
  width: 640,
  height: 480,
  actor: [hero],
  tiles: [[tiles], []],
});
game.screen.camera.actor = hero;
game.play();
