var cosmo = {
    game: null,
    start: null,
    loop: null,
    scene: null,
    time: {
        fps: 60,
        delta: 0,
        last: 0
    },
    key: [],
    touch: [],
    KEY: {
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    },
    QQVGA: [160, 120],
    HQVGA: [240, 160],
    QVGA: [320, 240],
    WQVGA: [400, 240],
    HVGA: [480, 320],
    nHD: [640, 360],
    VGA: [640, 480],
    WVGA: [800, 480],
    FWVGA: [854, 480],
    qHD: [960, 540],
    DVGA: [960, 640],
    SVGA: [800, 600],
    WSVGA: [1024, 600],
    XGA: [1024, 768],
    WXGA: [1280, 720],
    HD: [1280, 720],
    SXGA: [1280, 1024],
    //WXGA: [1366, 768],
    SXGA_P: [1400, 1050],
    WXGA_P: [1440, 900],
    UXGA: [1600, 1200],
    UXGA_PP: [1680, 1050],
    WUXGA: [1920, 1200],
    FHD: [1920, 1080],
    FULL_HD: [1920, 1080],
    QWXGA: [2048, 1152],
    QXGA: [2048, 1536],
    WQHD: [2560, 1440],
    WQXGA: [2560, 1600],
    LANDSCAPE: true,
    PORTRAIT: false
};
//--- System --------------------------------------------------------
cosmo.resources = function (id) {
    return document.getElementById(id);
}
cosmo.res = cosmo.resources;
//Events:
//Teclado:
cosmo.keysPressed = function (event) {
    //console.log(event.keyCode);
    cosmo.key[event.keyCode] = true;
}
cosmo.keysReleased = function (event) {
    cosmo.key[event.keyCode] = false;
}
window.addEventListener("keydown", cosmo.keysPressed, false);
window.addEventListener("keyup", cosmo.keysReleased, false);

//Leitura dos toques na tela
cosmo.touchAction = function (event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        cosmo.touch[i] = {
            x: Math.round(event.changedTouches[i].clientX * (cosmo.screen.size.width / cosmo.screen.size.content_width)),
            y: Math.round(event.changedTouches[i].clientY * (cosmo.screen.size.height / cosmo.screen.size.content_height)),
            radius: {
                x: event.changedTouches[i].radiusX,
                y: event.changedTouches[i].radiusY
            },
            force: event.changedTouches[i].force,
            rotation_angle: event.changedTouches[i].rotationAngle
        };
    }
}
document.addEventListener("touchstart", cosmo.touchAction);
document.addEventListener("touchmove", cosmo.touchAction);
document.addEventListener("touchend", function (event) {
    cosmo.touchAction(event);
    cosmo.touch = [];
});
//--- Screen --------------------------------------------------------
cosmo.Screen = function (set) {
    set = set || {};
    this.main_canvas = document.createElement('canvas');
    this.buffer_canvas = document.createElement('canvas');
    set.resolution = set.resolution || cosmo.QVGA;
    var content = cosmo.res(set.content) || document.body;
    this.size = {};
    this.size.device_width = document.documentElement.clientWidth;
    this.size.device_height = document.documentElement.clientHeight;
    this.size.content_width = set.content === undefined ? this.size.device_width : content.offsetWidth;
    this.size.content_height = set.content === undefined ? this.size.device_height : content.offsetHeight;
    var temp = this.size.content_width >= this.size.content_height;
    this.size.width = temp ? set.resolution[0] : set.resolution[1];
    this.size.height =
        (set.auto_height === undefined) || (set.auto_height === false) ?
            (temp ? set.resolution[1] : set.resolution[0]) :
            (this.size.width * (this.size.content_height / this.size.content_width));
    this.main_canvas.width = this.buffer_canvas.width = this.size.width;
    this.main_canvas.height = this.buffer_canvas.height = this.size.height;
    this.main_context = this.main_canvas.getContext('2d');
    this.buffer_context = this.buffer_canvas.getContext('2d');
    content.appendChild(this.main_canvas);

    this.text = [];
}
cosmo.Screen.prototype.draw_image = function (set) {
    set = set || {};
    if (set) {
        image = cosmo.res(set.image);
        this.buffer_context.save();
        this.buffer_context.translate(set.x, set.y);
        this.buffer_context.rotate((Math.PI / 180 * set.rotation) || 0);
        this.buffer_context.globalAlpha = set.opacity || 1;
        this.buffer_context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            -Math.round((set.origin_x || (image.width / 2)) * (set.scale_x || 1)),
            -Math.round((set.origin_y || (image.height / 2)) * (set.scale_y || 1)),
            Math.round(image.width * (set.scale_x || 1)),
            Math.round(image.height * (set.scale_y || 1))
        );
        this.buffer_context.restore();
    }
}
cosmo.Screen.prototype.draw_text = function (set) {
    if (set) this.text.push(set);
}
cosmo.Screen.prototype.update = function () {

}
cosmo.Screen.prototype.render = function () {
    for (var i in this.text) {
        var set = this.text[i];
        this.buffer_context.save();
        this.buffer_context.font = (set.size || '10') + "px " + (set.font || 'sans-serif');
        this.buffer_context.textAlign = set.align || 'start';
        this.buffer_context.textBaseline = set.base_line || "bottom";
        this.buffer_context.fillStyle = set.fill === undefined ? "#000" : set.fill;
        if (set.fill !== null && set.fill !== 'none') {
            this.buffer_context.fillText(set.text, set.x, set.y);
        }
        if (set.stroke !== undefined && set.stroke !== null && set.stroke !== 'none') {
            this.buffer_context.strokeStyle = set.stroke;
            this.buffer_context.lineWidth = set.line_width || 1;
            this.buffer_context.strokeText(set.text, set.x, set.y);
        }
        this.buffer_context.restore();
    }
    this.text = [];
    this.main_context.drawImage(this.buffer_canvas, 0, 0);
}
//--- Sound ---------------------------------------------------------
cosmo.Sound = function (set) {
    set = set || {};
    this.audio = cosmo.res(set.audio);
    this.audio.volume = set.volume || 1;
    this.audio.loop = set.loop === undefined ? false : true;
    this.audio.load();
    this.play = this.audio.play;
    this.pause = this.audio.pause;
}
cosmo.Sound.prototype.replay = function () {
    this.audio.currentTime = 0;
    this.play();
}
cosmo.Sound.prototype.set_volume = function (volume) {
    this.audio.volume = volume;
    this.audio.load();
}
//--- Tiles ---------------------------------------------------------
cosmo.Tiles = function (set) {
    set = set || {};
    image = cosmo.res(set.image);
    this.size = {
        row: set.row || 1,
        columns: set.columns || 1,
        width: Math.round(image.width / set.columns) || image.width,
        height: Math.round(image.height / set.row) || image.height
    }
    var buffer_canvas = document.createElement('canvas');
    buffer_canvas.width = 0;
    buffer_canvas.height = 0;
    for (var i in set.matrix) {
        if (set.matrix[i][1] >= buffer_canvas.width)
            buffer_canvas.width = set.matrix[i][1] + this.size.width;
        if (set.matrix[i][2] >= buffer_canvas.height)
            buffer_canvas.height = set.matrix[i][2] + this.size.height;
    }
    var buffer_context = buffer_.getContext('2d');
    for (var i in set.matrix) {
        buffer_context.drawImage(
            image,
            (set.matrix[i][0] % this.size.columns) * this.size.width,
            (Math.floor(set.matrix[i][0] / this.size.columns)) * this.size.height,
            this.size.width,
            this.size.height,
            set.matrix[i][1],
            set.matrix[i][2],
            this.size.width,
            this.size.height
        );
    }
    this.full_tiles = buffer_canvas;
}
cosmo.Tiles.prototype.render = function (scene) {
    cosmo.screen.buffer_context.drawImage(this.full_tiles, scene.x, scene.y);
}
//--- Sprite --------------------------------------------------------
cosmo.Sprite = function (set) {
    set = set || {};
    this.image = cosmo.res(set.image);
    this.animation = {
        frames: set.animation_frames || 1,
        speed: set.animation_speed || 1,
        current_frame: 0,
        fix: set.animation_fix || false,
        action: set.animation_action || null
    };
    this.scale = {
        x: set.scale_x || 1,
        y: set.scale_y || 1
    }
    this.rotation = set.rotation || 0;
    this.opacity = set.opacity || 1;
    this.visible = set.visible === undefined ? true : set.visible;
    this.size = {
        width: this.image.width / this.animation.frames,
        height: this.image.height
    };
    this.origin = {
        x: set.origin_x || Math.round(this.size.width / 2),
        y: set.origin_y || Math.round(this.size.height / 2)
    };
    this.collision = {
        rect: {},
        half: null,
        center: {
            x: 0,
            y: 0
        }
    };
    this.collision.rect.x = set.collision_x || 0;
    this.collision.rect.y = set.collision_y || 0;
    this.collision.rect.width = set.collision_width || this.size.width;
    this.collision.rect.height = set.collision_height || this.size.height;
    this.collision.half = {
        width: this.collision.rect.width / 2,
        height: this.collision.rect.height / 2
    };
}
cosmo.Sprite.prototype.update = function (x, y) {
    this.collision.center.x = x + cosmo.scene.x + this.collision.rect.x + this.collision.half.width - this.origin.x;
    this.collision.center.y = y + cosmo.scene.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
}
cosmo.Sprite.prototype.render = function (x, y) {
    var index = 0, next_frame = 0;
    if (this.animation.frames === 1)
        index = 0;
    else if (this.animation.fix !== false)
        index = this.animation.fix;
    else {
        next_frame = this.animation.current_frame + this.animation.speed * (this.animation.frames / cosmo.time.fps);
        if (next_frame >= this.animation.frames) {
            this.animation.current_frame = 0;
            if (this.animation.endAction) this.animation.endAction();
        } else
            this.animation.current_frame = next_frame;
        index = Math.floor(this.animation.current_frame);
    }
    cosmo.screen.buffer_context.save();
    cosmo.screen.buffer_context.translate(x + cosmo.scene.x, y + cosmo.scene.y);
    cosmo.screen.buffer_context.rotate(Math.PI / 180 * this.rotation);
    cosmo.screen.buffer_context.globalAlpha = this.opacity;
    cosmo.screen.buffer_context.drawImage(
        this.image,
        index * this.size.width,
        0,
        this.size.width,
        this.size.height,
        -this.origin.x,
        -this.origin.y,
        this.size.width * this.scale.x,
        this.size.height * this.scale.y
    );
    cosmo.screen.buffer_context.restore();
}
//--- Actor ---------------------------------------------------------
cosmo.Actor = function (set) {
    set = set || {};
    this.name = set.name || 'Actor';
    this.x = set.x || 0;
    this.y = set.y || 0;
    this.sprite = set.sprite || null;
    this.unique = set.unique === undefined ? false : set.unique;
    this.persistent = set.persistent === undefined ? false : set.persistent;
    this.solid = set.solid === undefined ? false : set.solid;
    this.start = set.start || null;
    this.loop = set.loop || null;
    this.over = set.over || null;
    this.block = {
        left: false,
        up: false,
        right: false,
        down: false
    };
}
cosmo.Actor.prototype.on_screen = function () {
    if (this.sprite) {
        var x1 = this.x - this.sprite.origin.x + cosmo.scene.x;
        var x2 = this.x + this.sprite.size.width - this.sprite.origin.x + cosmo.scene.x;
        var y1 = this.y - this.sprite.origin.y + cosmo.scene.y;
        var y2 = this.y + this.sprite.size.height - this.sprite.origin.y + cosmo.scene.y;
        if (x2 < 0 || x1 > cosmo.screen.size.width || y2 < 0 || y1 > cosmo.screen.size.height)
            return false;
    } else {
        if (this.x < 0 || this.x > cosmo.screen.size.width || this.y < 0 || this.y > cosmo.screen.size.height)
            return false;
    }
    return true;
}
cosmo.Actor.prototype.colliding = function (actor) {
    if (actor) {
        if (typeof actor == 'object') {
            var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
            var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
            var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
            var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
            if (leg_x < reach_x && leg_y < reach_y)
                return true;
            else
                return false;
        } else if (typeof actor == 'string') {
            var temp = this.colliding();
            if (temp) {
                if (temp.name == actor)
                    return true;
                else
                    return false;
            }
        }
    } else {
        for (var i in cosmo.scene.actor) {
            if (this !== cosmo.scene.actor[i] && this.colliding(cosmo.scene.actor[i]))
                return cosmo.scene.actor[i];
        }
        return false;
    }
}
cosmo.Actor.prototype.push = function (actor) {
    if (actor) {
        var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
        var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
        var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
        var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
        if (leg_x < reach_x && leg_y < reach_y) {
            var overlap = { x: reach_x - leg_x, y: reach_y - leg_y }
            if (overlap.x > overlap.y) {
                if (actor.sprite.collision.center.y <= this.sprite.collision.center.y)
                    actor.y -= overlap.y;
                else
                    actor.y += overlap.y;
            } else {
                if (actor.sprite.collision.center.x <= this.sprite.collision.center.x)
                    actor.x -= overlap.x;
                else
                    actor.x += overlap.x;
            }
            //if (actor.moving.enable)
            //    this.moving = { x: null, y: null, speed: null, type: null, enable: false, DIAGONAL: 1, YX: 2, XY: 3 };
        }
    } else {
        for (var i in cosmo.scene.actor) {
            if (this !== cosmo.scene.actor[i])
                this.push(cosmo.scene.actor[i]);
        }
    }
}
cosmo.Actor.prototype.update = function () {
    if (this.loop)
        this.loop(this);
    if (this.sprite && this.sprite.visible)
        this.sprite.update(this.x, this.y);
}
cosmo.Actor.prototype.render = function () {
    if (this.sprite && this.sprite.visible)
        this.sprite.render(this.x, this.y);
}
//--- Block Rect ----------------------------------------------------
cosmo.BlockRect = function (set) {
    set = set || {};
    this.x = set.x;
    this.y = set.y;
    this.width = set.width;
    this.height = set.height;
    this.half = {
        width: this.width / 2,
        height: this.height / 2
    }
    this.center = {
        x: this.x + this.half.width,
        y: this.y + this.half.height
    };
    this.actor = set.actor || null;
}
cosmo.BlockRect.prototype.block = function (actor) {
    if (actor.solid && actor.sprite !== null) {
        var leg_x = Math.abs(this.center.x - actor.sprite.collision.center.x);
        var leg_y = Math.abs(this.center.y - actor.sprite.collision.center.y);
        var reach_x = this.half.width + actor.sprite.collision.half.width;
        var reach_y = this.half.height + actor.sprite.collision.half.height;
        if (leg_x < reach_x && leg_y < reach_y) {
            var overlap = { x: reach_x - leg_x, y: reach_y - leg_y }
            if (overlap.x > overlap.y) {
                if (actor.sprite.collision.center.y <= this.center.y && !actor.block.up) {
                    actor.block.up = true;
                    actor.y -= overlap.y;
                } else if (actor.sprite.collision.center.y > this.center.y && !actor.block.down) {
                    actor.block.down = true;
                    actor.y += overlap.y;
                }
            } else {
                if (actor.sprite.collision.center.x <= this.center.x && !actor.block.left) {
                    actor.block.left = true;
                    actor.x -= overlap.x;
                } else if (actor.sprite.collision.center.x > this.center.x && !actor.block.right) {
                    actor.block.right = true;
                    actor.x += overlap.x;
                }
            }
            //            if (actor.moving.enable)
            //                actor.moving = { x: null, y: null, speed: null, type: null, enable: false, DIAGONAL: 1, YX: 2, XY: 3 };
        }
    }
}
cosmo.BlockRect.prototype.update = function () {
    this.center = {
        x: this.x + cosmo.scene.x + this.half.width,
        y: this.y + cosmo.scene.y + this.half.height
    };
    //console.log(this.center);
    if (this.actor === null) {
        for (var i in cosmo.scene.actor)
            this.block(cosmo.scene.actor[i]);
    } else if (Array.isArray(this.actor)) {
        for (var i in this.actor)
            this.block(this.actor[i]);
    } else {
        this.block(this.actor);
    }
}
//--- Button --------------------------------------------------------
cosmo.Button = function (set) {
    set = set || {};
    this.image = cosmo.res(set.image);
    this.x = set.x || 0;
    this.y = set.y || 0;
    this.press = set.press || null;
    this.hold = set.hold || null;
    this.scale = {};
    this.scale.x = set.scale_x || 1;
    this.scale.y = set.scale_y || 1;
    this.key = set.key || null;
    this.size = {};
    this.size.width = Math.round(this.image.width / 2);
    this.size.height = this.image.height;
    this.active = false;
}
cosmo.Button.prototype.pressed = function () {
    for (var i in cosmo.touch) {
        if (this.x - (this.size.width / 2) < cosmo.touch[i].x &&
            this.y - (this.size.height / 2) < cosmo.touch[i].y &&
            this.x + (this.size.width / 2) > cosmo.touch[i].x &&
            this.y + (this.size.height / 2) > cosmo.touch[i].y)
            return true;
    }
    return false;
}
cosmo.Button.prototype.update = function () {
    if (cosmo.key[this.key] || this.pressed()) {
        this.active = true;
        try { this.hold(); } catch (e) { }
    } else {
        if (this.active) {
            this.active = false;
            try { this.press(); } catch (e) { }
        }
    }
}
cosmo.Button.prototype.render = function () {
    cosmo.screen.buffer_context.drawImage(
        this.image,
        this.active ? this.size.width : 0,
        0,
        this.size.width,
        this.size.height,
        Math.round(this.x - this.size.width / 2),
        Math.round(this.y - this.size.height / 2),
        this.size.width * this.scale.x,
        this.size.height * this.scale.y
    );
}
//--- Analog --------------------------------------------------------
cosmo.Analog = function (set) {
    set = set || {};
}
cosmo.Analog.prototype.update = function () {

}
cosmo.Analog.prototype.render = function () {

}
//--- Scene ---------------------------------------------------------
cosmo.Scene = function (set) {
    set = set || {};
    this.x = set.x || 0;
    this.y = set.y || 0;
    this.size = {};
    this.size.width = set.width || cosmo.screen.size.width;
    this.size.height = set.height || cosmo.screen.height;
    this.actor = set.actor || [];
    this.tiles = set.tiles || [[], []];
    this.button = set.button || [];
    this.analog = set.analog || [];
    this.block_rect = set.block_rect || [];
    this.background_color = set.background_color || 'rgb(0,162,232)';
    this.background_image = set.background_image || [];
    this.background_music = set.background_music || null;
}
cosmo.Scene.prototype.loop = null;
cosmo.Scene.prototype.add = function (element, set) {
    set = set || {};
    switch (Object.getPrototypeOf(element)) {
        case cosmo.Actor.prototype:
            if (element.unique)
                this.actor.push(element);
            else
                this.actor.push(Object.assign(new cosmo.Actor(), element));
            var actor = this.actor[this.actor.length - 1];
            if (actor.start)
                actor.start(actor);
            actor.x = set[0] || set.x || actor.x;
            actor.y = set[1] || set.y || actor.y;
            break;
        case cosmo.Tiles.prototype:
            this.tiles[set || set.layer || 0].push(element);
            break;
        case cosmo.Button.prototype:
            this.button.push(element);
            element.x = set[0] || set.x || element.x;
            element.y = set[1] || set.y || element.y;
            break;
        case cosmo.Analog.prototype:
            this.analog.push(element);
            element.x = set[0] || set.x || element.x;
            element.y = set[1] || set.y || element.y;
            break;
        case cosmo.BlockRect.prototype:
            this.block_rect.push(element);
            break;
        case String.prototype:
            image = cosmo.res(element);
            this.background_image.push(element);
            break;
    }
}
cosmo.Scene.prototype.update = function () {
    this.actor.sort(function (a, b) { return a.y - b.y; });
    for (var i in this.actor) {
        if (this.actor[i].on_screen() || this.actor[i].persistent)
            this.actor[i].update();
    }
    for (var i in this.button)
        this.button[i].update();
    for (var i in this.block_rect)
        this.block_rect[i].update();
    if (this.loop)
        this.loop(this);
}
cosmo.Scene.prototype.render = function () {
    cosmo.screen.buffer_context.save();
    cosmo.screen.buffer_context.fillStyle = this.background_color;
    cosmo.screen.buffer_context.fillRect(0, 0, cosmo.screen.size.width, cosmo.screen.size.height);
    for (var i in this.background_image)
        cosmo.screen.buffer_context.drawImage(this.background_image[i], this.x, this.y);
    for (var i in this.tiles[0])
        this.tiles[0][i].render(this);
    for (var i in this.actor)
        if (this.actor[i].on_screen())
            this.actor[i].render();
    for (var i in this.tiles[1])
        this.tiles[1][i].render(this);
    for (var i in this.button)
        this.button[i].render();
}
//--- Main ----------------------------------------------------------
function game_loop() {
    window.requestAnimationFrame(game_loop);
    cosmo.scene.update();
    cosmo.screen.update();
    if (cosmo.loop) cosmo.loop();
    cosmo.scene.render();
    cosmo.screen.render();
    /*
    if (cosmo.scene) {
        cosmo.scene.render();
        cosmo.scene.update();
    }
    cosmo.screen.render();
    cosmo.screen.update();
    if (cosmo.loop)
        cosmo.loop();
        */
}
cosmo.play = function () {
    if (this.game) {
        this.game(this);
        if (this.start)
            this.start(this);
        game_loop();
    }
}