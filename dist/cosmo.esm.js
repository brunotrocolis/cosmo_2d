const n = {
  game: null,
  time: { fps: 60, last: 0 },
  key: [],
  touch: []
};
class y {
  constructor(i = {}) {
    this.main_canvas = document.createElement("canvas"), this.main_canvas.setAttribute("style", "display:block;margin:auto;width:100%;-ms-interpolation-mode:nearest-neighbor;image-rendering:-webkit-optimize-contrast;image-rendering:-webkit-crisp-edges;image-rendering:-moz-crisp-edges;image-rendering:-o-crisp-edges;image-rendering:pixelated;"), this.buffer_canvas = document.createElement("canvas");
    const e = (i.content ? document.getElementById(i.content) : null) ?? document.body;
    e.setAttribute("style", "margin:0;padding:0;overflow:hidden;");
    const o = document.documentElement.clientWidth, c = document.documentElement.clientHeight;
    this.size = {
      device: { width: o, height: c },
      content: {
        width: i.content ? e.offsetWidth : o,
        height: i.content ? e.offsetHeight : c
      },
      width: 0,
      height: 0
    };
    const s = i.resolution ?? [320, 240], a = i.orientation !== void 0 ? i.orientation : o >= c;
    this.size.width = a ? s[0] : s[1], this.size.height = i.auto_height ? this.size.width * (this.size.content.height / this.size.content.width) : a ? s[1] : s[0], this.main_canvas.width = this.buffer_canvas.width = this.size.width, this.main_canvas.height = this.buffer_canvas.height = this.size.height, this.main_context = this.main_canvas.getContext("2d"), this.buffer_context = this.buffer_canvas.getContext("2d"), e.appendChild(this.main_canvas);
    const l = Math.round(this.size.height * 0.1), d = Math.round(this.size.width * 0.1);
    this.camera = {
      top: i.camera_top ?? l,
      bottom: i.camera_bottom ?? l,
      left: i.camera_left ?? d,
      right: i.camera_right ?? d,
      actor: i.camera_actor
    }, this.button = i.button ?? [];
  }
  add(i, t = {}) {
    this.button.push(i), t.x !== void 0 && (i.x = t.x), t.y !== void 0 && (i.y = t.y);
  }
  update() {
    const { actor: i } = this.camera;
    if (i) {
      const t = n.game.scene, e = this.size.width, o = this.size.height;
      i.x < this.camera.left - t.x && t.x < 0 ? t.x = -(i.x - this.camera.left) : i.x > e - this.camera.right - t.x && t.x > -(t.size.width - e) && (t.x = -(i.x - (e - this.camera.right))), i.y < this.camera.top - t.y && t.y < 0 ? t.y = -(i.y - this.camera.top) : i.y > o - this.camera.bottom - t.y && t.y > -(t.size.height - o) && (t.y = -(i.y - (o - this.camera.bottom)));
    }
    this.button.forEach((t) => t.update());
  }
  render() {
    this.main_context.clearRect(0, 0, this.size.width, this.size.height), this.button.forEach((i) => i.render()), this.main_context.drawImage(this.buffer_canvas, 0, 0), this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
  }
}
class u {
  constructor(i = {}) {
    var t, e, o;
    this.name = i.name ?? "Actor", this.x = i.x ?? 0, this.y = i.y ?? 0, this.sprite = i.sprite, this.unique = i.unique ?? !1, this.persistent = i.persistent ?? !1, this.solid = i.solid ?? !0, this.block = { left: !1, up: !1, right: !1, down: !1 }, this.start = ((t = i.start) == null ? void 0 : t.bind(this)) ?? (() => {
    }), this.loop = ((e = i.loop) == null ? void 0 : e.bind(this)) ?? (() => {
    }), this.over = ((o = i.over) == null ? void 0 : o.bind(this)) ?? (() => {
    });
    for (const c of Object.keys(i))
      c in this || (this[c] = i[c]);
  }
  on_screen() {
    var a, l;
    const i = (a = n.game) == null ? void 0 : a.scene, t = (l = n.game) == null ? void 0 : l.screen;
    if (!i || !t || !this.sprite || !i.actor.includes(this)) return !1;
    const e = this.x - this.sprite.origin.x + i.x, o = this.x + this.sprite.size.width - this.sprite.origin.x + i.x, c = this.y - this.sprite.origin.y + i.y, s = this.y + this.sprite.size.height - this.sprite.origin.y + i.y;
    return !(o < 0 || e > t.size.width || s < 0 || c > t.size.height);
  }
  collision(i) {
    if (!this.sprite) return !1;
    if (typeof i == "string") {
      const e = this.collision();
      return e && e.name === i ? e : !1;
    }
    if (i instanceof u) {
      if (!i.sprite) return !1;
      const e = Math.abs(
        this.sprite.collision.center.x - i.sprite.collision.center.x
      ), o = Math.abs(
        this.sprite.collision.center.y - i.sprite.collision.center.y
      ), c = this.sprite.collision.half.width + i.sprite.collision.half.width, s = this.sprite.collision.half.height + i.sprite.collision.half.height;
      return e < c && o < s ? i : !1;
    }
    let t = !1;
    for (const e of n.game.scene.actor)
      e !== this && this.collision(e) && (t = e);
    return t;
  }
  push(i) {
    if (!this.sprite) return;
    if (!i) {
      for (const s of n.game.scene.actor) this.push(s);
      return;
    }
    if (!i.sprite) return;
    const t = Math.abs(this.sprite.collision.center.x - i.sprite.collision.center.x), e = Math.abs(this.sprite.collision.center.y - i.sprite.collision.center.y), o = this.sprite.collision.half.width + i.sprite.collision.half.width, c = this.sprite.collision.half.height + i.sprite.collision.half.height;
    if (t < o && e < c) {
      const s = { x: o - t, y: c - e };
      s.x > s.y ? i.y += i.sprite.collision.center.y <= this.sprite.collision.center.y ? -s.y : s.y : i.x += i.sprite.collision.center.x <= this.sprite.collision.center.x ? -s.x : s.x;
    }
  }
  update() {
    var i;
    this.loop(), (i = this.sprite) == null || i.update(this.x, this.y), this.block.left = !1, this.block.up = !1, this.block.right = !1, this.block.down = !1;
  }
  render() {
    this.sprite && this.sprite.render(this.x, this.y);
  }
}
class x {
  constructor(i = {}) {
    this.name = i.name ?? "Map", this.x = i.x ?? 0, this.y = i.y ?? 0, this.size = {
      width: i.width ?? n.game.screen.size.width,
      height: i.height ?? n.game.screen.size.height
    }, this.actor = [], i.actor && i.actor.forEach((t) => this.add(t)), this.tiles = i.tiles ?? [[], []], this.background = {
      color: i.background_color ?? "#FFFFFF",
      image: i.background_image ?? [],
      music: i.background_music ?? null
    };
  }
  add(i, t = {}) {
    if (i instanceof u) {
      const e = i.unique ? i : Object.assign(new u(), i);
      this.actor.push(e), e.start(), e.x = t.x ?? e.x, e.y = t.y ?? e.y;
    } else
      this.tiles[t.layer ?? 0].push(i);
  }
  update() {
    this.actor.forEach((i) => i.update()), this.tiles[0].forEach((i) => i.update()), this.tiles[1].forEach((i) => i.update());
  }
  render() {
    for (const i of this.tiles[0]) i.render();
    for (const i of this.actor)
      i.on_screen() && i.render();
    for (const i of this.tiles[1]) i.render();
  }
}
class z {
  constructor(i = {}) {
    n.game = this, this.screen = i.screen ?? new y(), this.scene = i.scene ?? new x(), i.loop && (this.loop = i.loop);
  }
  loop() {
  }
  play() {
    const i = () => {
      window.requestAnimationFrame(i), this.update(), this.render();
      const t = performance.now();
      n.time.fps = Math.round(1e3 / (t - n.time.last)), n.time.last = t;
    };
    n.time.last = performance.now(), i();
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
  update(i, t) {
    const e = n.game.scene;
    this.collision.center.x = i + e.x + this.collision.rect.x + this.collision.half.width - this.origin.x, this.collision.center.y = t + e.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
  }
  render(i, t) {
    if (!this.image.complete || this.image.naturalWidth === 0) return;
    const { animation: e } = this;
    let o = 0;
    if (e.frames > 1)
      if (e.fix !== !1)
        o = e.fix;
      else {
        const l = e.current_frame + e.speed * (e.frames / n.time.fps);
        l >= e.frames ? (e.current_frame = 0, e.over_action()) : e.current_frame = l, o = Math.floor(e.current_frame);
      }
    const c = n.game.scene, s = n.game.screen.buffer_context;
    this.rotation !== 0 || this.scale.x !== 1 || this.scale.y !== 1 ? (s.save(), s.translate(i + c.x, t + c.y), this.rotation !== 0 && s.rotate(Math.PI / 180 * this.rotation), s.globalAlpha = this.opacity, s.drawImage(
      this.image,
      o * this.size.width,
      0,
      this.size.width,
      this.size.height,
      -this.origin.x,
      -this.origin.y,
      this.size.width * this.scale.x,
      this.size.height * this.scale.y
    ), s.restore()) : (this.opacity !== 1 && (s.globalAlpha = this.opacity), s.drawImage(
      this.image,
      o * this.size.width,
      0,
      this.size.width,
      this.size.height,
      i + c.x - this.origin.x,
      t + c.y - this.origin.y,
      this.size.width,
      this.size.height
    ), this.opacity !== 1 && (s.globalAlpha = 1));
  }
}
class w {
  constructor(i) {
    this.x = i.x ?? 0, this.y = i.y ?? 0, this.size = { width: i.width, height: i.height }, this.half = { width: i.width / 2, height: i.height / 2 }, this.center = { x: 0, y: 0 };
  }
  update() {
    const i = n.game.scene;
    this.center.x = this.x + i.x + this.half.width, this.center.y = this.y + i.y + this.half.height;
    for (const t of i.actor) this._block(t);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _block(i) {
    if (!i.sprite || !i.solid) return;
    const t = Math.abs(this.center.x - i.sprite.collision.center.x), e = Math.abs(this.center.y - i.sprite.collision.center.y), o = this.half.width + i.sprite.collision.half.width, c = this.half.height + i.sprite.collision.half.height;
    if (t < o && e < c) {
      const s = o - t, a = c - e;
      s > a ? i.sprite.collision.center.y <= this.center.y && !i.block.up ? (i.block.up = !0, i.y -= a) : i.sprite.collision.center.y > this.center.y && !i.block.down && (i.block.down = !0, i.y += a) : i.sprite.collision.center.x <= this.center.x && !i.block.left ? (i.block.left = !0, i.x -= s) : i.sprite.collision.center.x > this.center.x && !i.block.right && (i.block.right = !0, i.x += s);
    }
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
    for (const e of i)
      e[2] >= this.tileMap.width && (this.tileMap.width = e[2] + this.size.width), e[3] >= this.tileMap.height && (this.tileMap.height = e[3] + this.size.height);
    const t = this.tileMap.getContext("2d");
    for (const e of i)
      t.drawImage(
        this.image,
        e[0] * this.size.width,
        e[1] * this.size.height,
        this.size.width,
        this.size.height,
        e[2],
        e[3],
        this.size.width,
        this.size.height
      );
  }
  setBlockMap(i) {
    var p;
    if (!this.tileBlock || !this.blockMap) return;
    let t = [];
    for (const h of i)
      (p = this.tileBlock[h[1]]) != null && p[h[0]] && t.push({
        x1: h[2],
        y1: h[3],
        x2: h[2] + this.size.width,
        y2: h[3] + this.size.height
      });
    t.sort((h, f) => h.y1 - f.y1);
    const e = [];
    let o = null, c = [];
    for (const h of t)
      o === null && (o = h.y1), h.y1 === o ? c.push(h) : (c.sort((f, m) => f.x1 - m.x1), e.push(c), o = h.y1, c = [h]);
    c.sort((h, f) => h.x1 - f.x1), e.push(c), t = e.flat();
    const s = [];
    let a = { ...t[0] };
    for (let h = 1; h < t.length; h++)
      a.x2 === t[h].x1 && a.y1 === t[h].y1 ? a.x2 = t[h].x2 : (s.push(a), a = { ...t[h] });
    s.push(a), s.sort((h, f) => h.x1 - f.x1);
    const l = [];
    let d = { ...s[0] };
    for (let h = 1; h < s.length; h++)
      d.y2 === s[h].y1 && d.x1 === s[h].x1 && d.x2 === s[h].x2 ? d.y2 = s[h].y2 : (l.push(d), d = { ...s[h] });
    l.push(d);
    for (const h of l)
      this.blockMap.push(
        new w({ x: h.x1, y: h.y1, width: h.x2 - h.x1, height: h.y2 - h.y1 })
      );
  }
  update() {
    var i;
    (i = this.blockMap) == null || i.forEach((t) => t.update());
  }
  render() {
    if (this.tileMap) {
      const i = n.game.scene;
      n.game.screen.buffer_context.drawImage(
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
    for (const i of n.touch) {
      const t = this.size.width * this.scale.x / 2, e = this.size.height * this.scale.y / 2;
      if (i.x > this.x - t && i.x < this.x + t && i.y > this.y - e && i.y < this.y + e)
        return !0;
    }
    return !1;
  }
  update() {
    n.key[this.key] || this.pressed() ? (this.active = !0, this.hold()) : this.active && (this.active = !1, this.press());
  }
  render() {
    if (!this.size) return;
    n.game.screen.buffer_context.drawImage(
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
const A = [160, 120], E = [240, 160], G = [320, 240], I = [400, 240], V = [480, 320], X = [640, 360], H = [640, 480], F = [800, 480], T = [854, 480], W = [960, 540], Y = [960, 640], C = [800, 600], S = [1024, 600], B = [1024, 768], D = [1280, 720], L = [1280, 720], Q = [1280, 1024], R = [1920, 1080], q = [1920, 1080], O = [2560, 1440], P = !1, j = !0, N = "3.0.1", U = n.time, J = n.key, K = n.touch;
window.addEventListener("keydown", (r) => {
  n.key[r.keyCode] = !0;
});
window.addEventListener("keyup", (r) => {
  n.key[r.keyCode] = !1;
});
function g(r) {
  var t;
  const i = (t = n.game) == null ? void 0 : t.screen;
  for (let e = 0; e < r.changedTouches.length; e++) {
    const o = r.changedTouches[e];
    n.touch[e] = {
      x: i ? Math.round(o.clientX * (i.size.width / i.size.content.width)) : o.clientX,
      y: i ? Math.round(o.clientY * (i.size.height / i.size.content.height)) : o.clientY,
      radius: { x: o.radiusX, y: o.radiusY },
      force: o.force,
      rotation_angle: o.rotationAngle
    };
  }
}
document.addEventListener("touchstart", g);
document.addEventListener("touchmove", g);
document.addEventListener("touchend", (r) => {
  g(r), n.touch = [];
});
export {
  u as Actor,
  M as Analog,
  w as Block,
  k as Button,
  Y as DVGA,
  R as FHD,
  q as FULL_HD,
  T as FWVGA,
  z as Game,
  L as HD,
  E as HQVGA,
  V as HVGA,
  P as LANDSCAPE,
  j as PORTRAIT,
  A as QQVGA,
  G as QVGA,
  C as SVGA,
  Q as SXGA,
  x as Scene,
  y as Screen,
  v as Sound,
  b as Sprite,
  _ as Tiles,
  N as VERSION,
  H as VGA,
  O as WQHD,
  I as WQVGA,
  S as WSVGA,
  F as WVGA,
  D as WXGA,
  B as XGA,
  J as key,
  X as nHD,
  W as qHD,
  n as state,
  U as time,
  K as touch
};
