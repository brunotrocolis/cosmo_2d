const o = {
  game: null,
  time: { fps: 60, last: 0 },
  key: [],
  touch: []
};
class y {
  constructor(i = {}) {
    this.main_canvas = document.createElement("canvas"), this.main_canvas.setAttribute("style", "display:block;margin:auto;width:100%;-ms-interpolation-mode:nearest-neighbor;image-rendering:-webkit-optimize-contrast;image-rendering:-webkit-crisp-edges;image-rendering:-moz-crisp-edges;image-rendering:-o-crisp-edges;image-rendering:pixelated;"), this.buffer_canvas = document.createElement("canvas");
    const t = (i.content ? document.getElementById(i.content) : null) ?? document.body;
    t.setAttribute("style", "margin:0;padding:0;overflow:hidden;");
    const n = document.documentElement.clientWidth, c = document.documentElement.clientHeight;
    this.size = {
      device: { width: n, height: c },
      content: {
        width: i.content ? t.offsetWidth : n,
        height: i.content ? t.offsetHeight : c
      },
      width: 0,
      height: 0
    };
    const s = i.resolution ?? [320, 240], a = i.orientation !== void 0 ? i.orientation : n >= c;
    this.size.width = a ? s[0] : s[1], this.size.height = i.auto_height ? this.size.width * (this.size.content.height / this.size.content.width) : a ? s[1] : s[0], this.main_canvas.width = this.buffer_canvas.width = this.size.width, this.main_canvas.height = this.buffer_canvas.height = this.size.height, this.main_context = this.main_canvas.getContext("2d"), this.buffer_context = this.buffer_canvas.getContext("2d"), t.appendChild(this.main_canvas);
    const d = Math.round(this.size.height * 0.1), l = Math.round(this.size.width * 0.1);
    this.camera = {
      top: i.camera_top ?? d,
      bottom: i.camera_bottom ?? d,
      left: i.camera_left ?? l,
      right: i.camera_right ?? l,
      actor: i.camera_actor
    }, this.button = i.button ?? [];
  }
  add(i, e = {}) {
    this.button.push(i), e.x !== void 0 && (i.x = e.x), e.y !== void 0 && (i.y = e.y);
  }
  update() {
    const { actor: i } = this.camera;
    if (i) {
      const e = o.game.scene, t = this.size.width, n = this.size.height;
      i.x < this.camera.left - e.x && e.x < 0 ? e.x = -(i.x - this.camera.left) : i.x > t - this.camera.right - e.x && e.x > -(e.size.width - t) && (e.x = -(i.x - (t - this.camera.right))), i.y < this.camera.top - e.y && e.y < 0 ? e.y = -(i.y - this.camera.top) : i.y > n - this.camera.bottom - e.y && e.y > -(e.size.height - n) && (e.y = -(i.y - (n - this.camera.bottom)));
    }
    this.button.forEach((e) => e.update());
  }
  render() {
    this.main_context.clearRect(0, 0, this.size.width, this.size.height), this.button.forEach((i) => i.render()), this.main_context.drawImage(this.buffer_canvas, 0, 0), this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
  }
}
class u {
  constructor(i = {}) {
    var e, t, n;
    this.name = i.name ?? "Actor", this.x = i.x ?? 0, this.y = i.y ?? 0, this.sprite = i.sprite, this.unique = i.unique ?? !1, this.persistent = i.persistent ?? !1, this.solid = i.solid ?? !0, this.block = { left: !1, up: !1, right: !1, down: !1 }, this.start = ((e = i.start) == null ? void 0 : e.bind(this)) ?? (() => {
    }), this.loop = ((t = i.loop) == null ? void 0 : t.bind(this)) ?? (() => {
    }), this.over = ((n = i.over) == null ? void 0 : n.bind(this)) ?? (() => {
    });
    for (const c of Object.keys(i))
      c in this || (this[c] = i[c]);
  }
  on_screen() {
    var a, d;
    const i = (a = o.game) == null ? void 0 : a.scene, e = (d = o.game) == null ? void 0 : d.screen;
    if (!i || !e || !this.sprite || !i.actor.includes(this)) return !1;
    const t = this.x - this.sprite.origin.x + i.x, n = this.x + this.sprite.size.width - this.sprite.origin.x + i.x, c = this.y - this.sprite.origin.y + i.y, s = this.y + this.sprite.size.height - this.sprite.origin.y + i.y;
    return !(n < 0 || t > e.size.width || s < 0 || c > e.size.height);
  }
  collision(i) {
    if (!this.sprite) return !1;
    if (typeof i == "string") {
      const t = this.collision();
      return t && t.name === i ? t : !1;
    }
    if (i instanceof u) {
      if (!i.sprite) return !1;
      const t = Math.abs(
        this.sprite.collision.center.x - i.sprite.collision.center.x
      ), n = Math.abs(
        this.sprite.collision.center.y - i.sprite.collision.center.y
      ), c = this.sprite.collision.half.width + i.sprite.collision.half.width, s = this.sprite.collision.half.height + i.sprite.collision.half.height;
      return t < c && n < s ? i : !1;
    }
    let e = !1;
    for (const t of o.game.scene.actor)
      t !== this && this.collision(t) && (e = t);
    return e;
  }
  push(i) {
    if (!this.sprite) return;
    if (!i) {
      for (const s of o.game.scene.actor) this.push(s);
      return;
    }
    if (!i.sprite) return;
    const e = Math.abs(this.sprite.collision.center.x - i.sprite.collision.center.x), t = Math.abs(this.sprite.collision.center.y - i.sprite.collision.center.y), n = this.sprite.collision.half.width + i.sprite.collision.half.width, c = this.sprite.collision.half.height + i.sprite.collision.half.height;
    if (e < n && t < c) {
      const s = { x: n - e, y: c - t };
      s.x > s.y ? i.y += i.sprite.collision.center.y <= this.sprite.collision.center.y ? -s.y : s.y : i.x += i.sprite.collision.center.x <= this.sprite.collision.center.x ? -s.x : s.x;
    }
  }
  update() {
    var i;
    this.loop(), (i = this.sprite) == null || i.update(this.x, this.y);
  }
  render() {
    this.sprite && this.sprite.render(this.x, this.y);
  }
}
class x {
  constructor(i = {}) {
    this.name = i.name ?? "Map", this.x = i.x ?? 0, this.y = i.y ?? 0, this.size = {
      width: i.width ?? o.game.screen.size.width,
      height: i.height ?? o.game.screen.size.height
    }, this.actor = [], i.actor && i.actor.forEach((e) => this.add(e)), this.tiles = i.tiles ?? [[], []], this.background = {
      color: i.background_color ?? "#FFFFFF",
      image: i.background_image ?? [],
      music: i.background_music ?? null
    };
  }
  add(i, e = {}) {
    if (i instanceof u) {
      const t = i.unique ? i : Object.assign(new u(), i);
      this.actor.push(t), t.start(), t.x = e.x ?? t.x, t.y = e.y ?? t.y;
    } else
      this.tiles[e.layer ?? 0].push(i);
  }
  update() {
    this.actor.forEach((i) => i.update()), this.tiles[0].forEach((i) => i.update()), this.tiles[1].forEach((i) => i.update());
  }
  render() {
    this.tiles[0].forEach((i) => i.render()), this.actor.forEach((i) => i.render()), this.tiles[1].forEach((i) => i.render());
  }
}
class z {
  constructor(i = {}) {
    o.game = this, this.screen = i.screen ?? new y(), this.scene = i.scene ?? new x(), i.loop && (this.loop = i.loop);
  }
  loop() {
  }
  play() {
    const i = () => {
      window.requestAnimationFrame(i), this.update(), this.render(), o.time.fps = Math.round(1e3 / (performance.now() - o.time.last)), o.time.last = performance.now();
    };
    o.time.last = performance.now(), i();
  }
  update() {
    this.loop(), this.scene.update(), this.screen.update();
  }
  render() {
    this.scene.render(), this.screen.render();
  }
}
class b {
  constructor(i = {}) {
    this.image = new Image(), this.image.src = i.image ?? "", this.animation = {
      frames: i.animation_frames ?? 1,
      speed: i.animation_speed ?? 1,
      current_frame: 0,
      fix: i.animation_fix !== void 0 ? i.animation_fix : !1,
      over_action: i.over_action ?? (() => {
      })
    }, this.scale = { x: i.scale_x ?? 1, y: i.scale_y ?? 1 }, this.rotation = i.rotation ?? 0, this.opacity = i.opacity ?? 1, this.size = { width: 0, height: 0 }, this.origin = { x: 0, y: 0 }, this.collision = {
      rect: { x: i.collision_x ?? 0, y: i.collision_y ?? 0, width: 0, height: 0 },
      half: { width: 0, height: 0 },
      center: { x: 0, y: 0 }
    }, this.image.onload = () => {
      this.size = {
        width: this.image.width / this.animation.frames,
        height: this.image.height
      }, this.origin = {
        x: i.origin_x ?? Math.round(this.size.width / 2),
        y: i.origin_y ?? Math.round(this.size.height / 2)
      }, this.collision.rect.width = i.collision_width ?? this.size.width, this.collision.rect.height = i.collision_height ?? this.size.height, this.collision.half = {
        width: this.collision.rect.width / 2,
        height: this.collision.rect.height / 2
      };
    };
  }
  update(i, e) {
    const t = o.game.scene;
    this.collision.center.x = i + t.x + this.collision.rect.x + this.collision.half.width - this.origin.x, this.collision.center.y = e + t.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
  }
  render(i, e) {
    const { animation: t } = this;
    let n = 0;
    if (t.frames > 1)
      if (t.fix !== !1)
        n = t.fix;
      else {
        const a = t.current_frame + t.speed * (t.frames / o.time.fps);
        a >= t.frames ? (t.current_frame = 0, t.over_action()) : t.current_frame = a, n = Math.floor(t.current_frame);
      }
    const c = o.game.scene, s = o.game.screen.buffer_context;
    s.save(), s.translate(i + c.x, e + c.y), s.rotate(Math.PI / 180 * this.rotation), s.globalAlpha = this.opacity, s.drawImage(
      this.image,
      n * this.size.width,
      0,
      this.size.width,
      this.size.height,
      -this.origin.x,
      -this.origin.y,
      this.size.width * this.scale.x,
      this.size.height * this.scale.y
    ), s.restore();
  }
}
class w {
  constructor(i) {
    this.x = i.x ?? 0, this.y = i.y ?? 0, this.size = { width: i.width, height: i.height }, this.half = { width: i.width / 2, height: i.height / 2 };
  }
  update() {
    const i = o.game.scene;
    this.center = {
      x: this.x + i.x + this.half.width,
      y: this.y + i.y + this.half.height
    }, i.actor.forEach((e) => this._block(e));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block(i) {
    if (!i.sprite || !i.solid) return;
    const e = Math.abs(this.center.x - i.sprite.collision.center.x), t = Math.abs(this.center.y - i.sprite.collision.center.y), n = this.half.width + i.sprite.collision.half.width, c = this.half.height + i.sprite.collision.half.height;
    if (e < n && t < c) {
      const s = { x: n - e, y: c - t };
      s.x > s.y ? i.sprite.collision.center.y <= this.center.y && !i.block.up ? (i.block.up = !0, i.y -= s.y) : i.sprite.collision.center.y > this.center.y && !i.block.down && (i.block.down = !0, i.y += s.y) : i.sprite.collision.center.x <= this.center.x && !i.block.left ? (i.block.left = !0, i.x -= s.x) : i.sprite.collision.center.x > this.center.x && !i.block.right && (i.block.right = !0, i.x += s.x);
    }
    i.block = { left: !1, up: !1, right: !1, down: !1 };
  }
}
class _ {
  constructor(i) {
    this.image = new Image(), this.image.src = i.image, this.image.onload = () => {
      this.size = {
        rows: i.rows ?? 1,
        columns: i.columns ?? 1,
        width: Math.round(this.image.width / (i.columns ?? 1)),
        height: Math.round(this.image.height / (i.rows ?? 1))
      }, i.matrix && (this.setTileMap(i.matrix), i.block && (this.tileBlock = i.block, this.blockMap = [], this.setBlockMap(i.matrix)));
    };
  }
  setTileMap(i) {
    this.tileMap = document.createElement("canvas"), this.tileMap.width = 0, this.tileMap.height = 0;
    for (const t of i)
      t[2] >= this.tileMap.width && (this.tileMap.width = t[2] + this.size.width), t[3] >= this.tileMap.height && (this.tileMap.height = t[3] + this.size.height);
    const e = this.tileMap.getContext("2d");
    for (const t of i)
      e.drawImage(
        this.image,
        t[0] * this.size.width,
        t[1] * this.size.height,
        this.size.width,
        this.size.height,
        t[2],
        t[3],
        this.size.width,
        this.size.height
      );
  }
  setBlockMap(i) {
    var p;
    if (!this.tileBlock || !this.blockMap) return;
    let e = [];
    for (const h of i)
      (p = this.tileBlock[h[1]]) != null && p[h[0]] && e.push({
        x1: h[2],
        y1: h[3],
        x2: h[2] + this.size.width,
        y2: h[3] + this.size.height
      });
    e.sort((h, f) => h.y1 - f.y1);
    const t = [];
    let n = null, c = [];
    for (const h of e)
      n === null && (n = h.y1), h.y1 === n ? c.push(h) : (c.sort((f, m) => f.x1 - m.x1), t.push(c), n = h.y1, c = [h]);
    c.sort((h, f) => h.x1 - f.x1), t.push(c), e = t.flat();
    const s = [];
    let a = { ...e[0] };
    for (let h = 1; h < e.length; h++)
      a.x2 === e[h].x1 && a.y1 === e[h].y1 ? a.x2 = e[h].x2 : (s.push(a), a = { ...e[h] });
    s.push(a), s.sort((h, f) => h.x1 - f.x1);
    const d = [];
    let l = { ...s[0] };
    for (let h = 1; h < s.length; h++)
      l.y2 === s[h].y1 && l.x1 === s[h].x1 && l.x2 === s[h].x2 ? l.y2 = s[h].y2 : (d.push(l), l = { ...s[h] });
    d.push(l);
    for (const h of d)
      this.blockMap.push(
        new w({ x: h.x1, y: h.y1, width: h.x2 - h.x1, height: h.y2 - h.y1 })
      );
  }
  update() {
    var i;
    (i = this.blockMap) == null || i.forEach((e) => e.update());
  }
  render() {
    if (this.tileMap) {
      const i = o.game.scene;
      o.game.screen.buffer_context.drawImage(
        this.tileMap,
        i.x,
        i.y
      );
    }
  }
}
class k {
  constructor(i = {}) {
    this.image = new Image(), this.image.src = i.image ?? "", this.x = i.x ?? 0, this.y = i.y ?? 0, this.scale = { x: i.scale_x ?? 1, y: i.scale_y ?? 1 }, this.key = i.key, this.active = !1, this.image.onload = () => {
      this.size = { width: Math.round(this.image.width / 2), height: this.image.height };
    }, i.press && (this.press = i.press), i.hold && (this.hold = i.hold);
  }
  press() {
  }
  hold() {
  }
  pressed() {
    if (!this.size) return !1;
    for (const i of o.touch) {
      const e = this.size.width * this.scale.x / 2, t = this.size.height * this.scale.y / 2;
      if (i.x > this.x - e && i.x < this.x + e && i.y > this.y - t && i.y < this.y + t)
        return !0;
    }
    return !1;
  }
  update() {
    o.key[this.key] || this.pressed() ? (this.active = !0, this.hold()) : this.active && (this.active = !1, this.press());
  }
  render() {
    if (!this.size) return;
    o.game.screen.buffer_context.drawImage(
      this.image,
      this.active ? this.size.width : 0,
      0,
      this.size.width,
      this.size.height,
      Math.round(this.x - this.size.width * this.scale.x / 2),
      Math.round(this.y - this.size.height * this.scale.y / 2),
      this.size.width * this.scale.x,
      this.size.height * this.scale.y
    );
  }
}
class v {
  constructor(i) {
    this.audio = new Audio(i.sound), this.audio.volume = i.volume ?? 1, this.audio.loop = i.loop ?? !1;
  }
  play() {
    this.audio.play();
  }
  pause() {
    this.audio.pause();
  }
  replay() {
    this.audio.currentTime = 0, this.play();
  }
  setVolume(i) {
    this.audio.volume = i, this.audio.load();
  }
}
class M {
}
const A = [160, 120], E = [240, 160], G = [320, 240], V = [400, 240], H = [480, 320], I = [640, 360], X = [640, 480], F = [800, 480], W = [854, 480], Y = [960, 540], C = [960, 640], S = [800, 600], T = [1024, 600], B = [1024, 768], D = [1280, 720], L = [1280, 720], Q = [1280, 1024], R = [1920, 1080], q = [1920, 1080], O = [2560, 1440], P = !1, j = !0, N = "3.0.1", U = o.time, J = o.key, K = o.touch;
window.addEventListener("keydown", (r) => {
  o.key[r.keyCode] = !0;
});
window.addEventListener("keyup", (r) => {
  o.key[r.keyCode] = !1;
});
function g(r) {
  var e;
  const i = (e = o.game) == null ? void 0 : e.screen;
  for (let t = 0; t < r.changedTouches.length; t++) {
    const n = r.changedTouches[t];
    o.touch[t] = {
      x: i ? Math.round(n.clientX * (i.size.width / i.size.content.width)) : n.clientX,
      y: i ? Math.round(n.clientY * (i.size.height / i.size.content.height)) : n.clientY,
      radius: { x: n.radiusX, y: n.radiusY },
      force: n.force,
      rotation_angle: n.rotationAngle
    };
  }
}
document.addEventListener("touchstart", g);
document.addEventListener("touchmove", g);
document.addEventListener("touchend", (r) => {
  g(r), o.touch = [];
});
export {
  u as Actor,
  M as Analog,
  w as Block,
  k as Button,
  C as DVGA,
  R as FHD,
  q as FULL_HD,
  W as FWVGA,
  z as Game,
  L as HD,
  E as HQVGA,
  H as HVGA,
  P as LANDSCAPE,
  j as PORTRAIT,
  A as QQVGA,
  G as QVGA,
  S as SVGA,
  Q as SXGA,
  x as Scene,
  y as Screen,
  v as Sound,
  b as Sprite,
  _ as Tiles,
  N as VERSION,
  X as VGA,
  O as WQHD,
  V as WQVGA,
  T as WSVGA,
  F as WVGA,
  D as WXGA,
  B as XGA,
  J as key,
  I as nHD,
  Y as qHD,
  o as state,
  U as time,
  K as touch
};
