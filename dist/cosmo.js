var cosmo;
(function (cosmo) {
    cosmo.QQVGA = [160, 120];
    cosmo.HQVGA = [240, 160];
    cosmo.QVGA = [320, 240];
    cosmo.WQVGA = [400, 240];
    cosmo.HVGA = [480, 320];
    cosmo.nHD = [640, 360];
    cosmo.VGA = [640, 480];
    cosmo.WVGA = [800, 480];
    cosmo.FWVGA = [854, 480];
    cosmo.qHD = [960, 540];
    cosmo.DVGA = [960, 640];
    cosmo.SVGA = [800, 600];
    cosmo.WSVGA = [1024, 600];
    cosmo.XGA = [1024, 768];
    cosmo.WXGA = [1280, 720];
    cosmo.HD = [1280, 720];
    cosmo.SXGA = [1280, 1024];
    cosmo.SXGA_P = [1400, 1050];
    cosmo.WXGA_P = [1440, 900];
    cosmo.UXGA = [1600, 1200];
    cosmo.UXGA_PP = [1680, 1050];
    cosmo.WUXGA = [1920, 1200];
    cosmo.FHD = [1920, 1080];
    cosmo.FULL_HD = [1920, 1080];
    cosmo.QWXGA = [2048, 1152];
    cosmo.QXGA = [2048, 1536];
    cosmo.WQHD = [2560, 1440];
    cosmo.WQXGA = [2560, 1600];
    cosmo.LANDSCAPE = false;
    cosmo.PORTRAIT = true;
    // Teste:
    cosmo.test = {
        active: false,
        update: function () {
        },
        render: function () {
            // Mostrar FPS na tela:
            cosmo.game.screen.buffer_context.fillStyle = "#000000";
            cosmo.game.screen.buffer_context.fillText("FPS: " + cosmo.time.fps, 10, 10);
            // Mostrar limites da camera:
            cosmo.game.screen.buffer_context.strokeStyle = "#FFFF00";
            cosmo.game.screen.buffer_context.strokeRect(cosmo.game.screen.camera.left, cosmo.game.screen.camera.top, cosmo.game.screen.size.width - (cosmo.game.screen.camera.left + cosmo.game.screen.camera.right), cosmo.game.screen.size.height - (cosmo.game.screen.camera.top + cosmo.game.screen.camera.bottom));
            // Mostrar parâmetros dos sprites:
            cosmo.game.scene.actor.forEach(function (actor) {
                var s = actor.sprite;
                var b = cosmo.game.screen.buffer_context;
                if (s !== undefined) {
                    var x = actor.x + cosmo.game.scene.x;
                    var y = actor.y + cosmo.game.scene.y;
                    b.beginPath();
                    b.moveTo(x - 3, y);
                    b.lineTo(x + 3, y);
                    b.moveTo(x, y - 3);
                    b.lineTo(x, y + 3);
                    b.strokeStyle = "#FF0000";
                    b.stroke();
                    b.closePath();
                    b.strokeStyle = "#0000FF";
                    b.strokeRect(x - s.origin.x, y - s.origin.y, s.size.width, s.size.height);
                    if (actor.collision()) {
                        b.strokeStyle = "#FF0000";
                    }
                    else {
                        b.strokeStyle = "#00FF00";
                    }
                    b.strokeRect((x - s.origin.x) + s.collision.rect.x, (y - s.origin.y) + s.collision.rect.y, s.collision.rect.width, s.collision.rect.height);
                }
            });
            // Mostrar áreas bloqueadas:
            cosmo.game.screen.buffer_context.strokeStyle = "#FF0000";
            cosmo.game.screen.buffer_context.fillStyle = "rgba(255,0,0,0.3)";
            cosmo.game.scene.tiles[0].forEach(function (tiles) {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(function (block) {
                        cosmo.game.screen.buffer_context.strokeRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                        cosmo.game.screen.buffer_context.fillRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
            cosmo.game.scene.tiles[1].forEach(function (tiles) {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(function (block) {
                        cosmo.game.screen.buffer_context.strokeRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                        cosmo.game.screen.buffer_context.fillRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
        }
    };
    cosmo.time = {
        fps: 60,
        last: 0
    };
    cosmo.key = [];
    function fps() {
        cosmo.time.fps = Math.round(1000 / (performance.now() - cosmo.time.last));
        cosmo.time.last = performance.now();
    }
    cosmo.fps = fps;
    function loop(last) {
        window.requestAnimationFrame(loop);
        cosmo.game.update();
        cosmo.game.render();
        fps();
    }
    cosmo.loop = loop;
    function play(game) {
        cosmo.game = game;
        loop(performance.now());
    }
    cosmo.play = play;
    window.addEventListener('keydown', function (event) {
        cosmo.key[event.keyCode] = true;
        //console.log(event.keyCode);
    }, false);
    window.addEventListener("keyup", function (event) {
        cosmo.key[event.keyCode] = false;
    }, false);
    var Actor = /** @class */ (function () {
        function Actor(set) {
            if (set === void 0) { set = {}; }
            this.name = set.name || 'Actor';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.sprite = set.sprite || void 0;
            this.unique = set.unique === void 0 ? false : set.unique;
            this.persistent = set.persistent === void 0 ? false : set.persistent;
            this.solid = set.solid === void 0 ? true : set.solid;
            this.block = {
                left: false,
                up: false,
                right: false,
                down: false
            };
            this.start = set.start || function () { };
            this.loop = set.loop || function () { };
            this.over = set.over || function () { };
        }
        Actor.prototype.start = function () { };
        Actor.prototype.loop = function () { };
        Actor.prototype.over = function () { };
        Actor.prototype.on_screen = function () {
            if (cosmo.game.scene.actor.indexOf(this) > -1 && this.sprite !== void 0) {
                var x1 = this.x - this.sprite.origin.x + cosmo.game.scene.x;
                var x2 = this.x + this.sprite.size.width - this.sprite.origin.x + cosmo.game.scene.x;
                var y1 = this.y - this.sprite.origin.y + cosmo.game.scene.y;
                var y2 = this.y + this.sprite.size.height - this.sprite.origin.y + cosmo.game.scene.y;
                if (x2 < 0 || x1 > cosmo.game.screen.size.width || y2 < 0 || y1 > cosmo.game.screen.size.height) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        };
        Actor.prototype.collision = function (actor) {
            var _this = this;
            if (this.sprite !== undefined) {
                switch (typeof actor) {
                    case 'string':
                        var temp = this.collision();
                        if (temp) {
                            if (temp.name === actor) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    case 'object':
                        if (actor.sprite !== undefined) {
                            var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
                            var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
                            var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
                            var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
                            if (leg_x < reach_x && leg_y < reach_y) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    case 'undefined':
                        cosmo.game.scene.actor.forEach(function (scene_actor) {
                            if (_this !== scene_actor && _this.collision(scene_actor)) {
                                return scene_actor;
                            }
                        });
                        return false;
                }
            }
            else {
                return false;
            }
        };
        Actor.prototype.push = function (actor) {
            var _this = this;
            if (this.sprite !== undefined) {
                if (actor === undefined) {
                    cosmo.game.scene.actor.forEach(function (scene_actor) {
                        _this.push(scene_actor);
                    });
                }
                else {
                    if (actor.sprite !== undefined) {
                        var leg_x = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
                        var leg_y = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
                        var reach_x = this.sprite.collision.half.width + actor.sprite.collision.half.width;
                        var reach_y = this.sprite.collision.half.height + actor.sprite.collision.half.height;
                        if (leg_x < reach_x && leg_y < reach_y) {
                            var overlap = { x: reach_x - leg_x, y: reach_y - leg_y };
                            if (overlap.x > overlap.y) {
                                if (actor.sprite.collision.center.y <= this.sprite.collision.center.y)
                                    actor.y -= overlap.y;
                                else
                                    actor.y += overlap.y;
                            }
                            else {
                                if (actor.sprite.collision.center.x <= this.sprite.collision.center.x)
                                    actor.x -= overlap.x;
                                else
                                    actor.x += overlap.x;
                            }
                        }
                    }
                }
            }
        };
        Actor.prototype.update = function () {
            this.loop();
            this.sprite.update(this.x, this.y);
        };
        Actor.prototype.render = function () {
            this.sprite.render(this.x, this.y);
        };
        return Actor;
    }());
    cosmo.Actor = Actor;
    var Analog = /** @class */ (function () {
        function Analog() {
        }
        return Analog;
    }());
    cosmo.Analog = Analog;
    var Block = /** @class */ (function () {
        function Block(set) {
            if (set === void 0) { set = {}; }
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width,
                height: set.height
            };
            this.half = {
                width: this.size.width / 2,
                height: this.size.height / 2
            };
        }
        Block.prototype.update = function () {
            var _this = this;
            this.center = {
                x: this.x + cosmo.game.scene.x + this.half.width,
                y: this.y + cosmo.game.scene.y + this.half.height
            };
            cosmo.game.scene.actor.forEach(function (actor) {
                _this.block(actor);
            });
        };
        Block.prototype.block = function (actor) {
            if (actor.sprite !== void 0 && actor.solid) {
                var leg_x = Math.abs(this.center.x - actor.sprite.collision.center.x);
                var leg_y = Math.abs(this.center.y - actor.sprite.collision.center.y);
                var reach_x = this.half.width + actor.sprite.collision.half.width;
                var reach_y = this.half.height + actor.sprite.collision.half.height;
                if (leg_x < reach_x && leg_y < reach_y) {
                    var overlap = { x: reach_x - leg_x, y: reach_y - leg_y };
                    if (overlap.x > overlap.y) {
                        if (actor.sprite.collision.center.y <= this.center.y && !actor.block.up) {
                            actor.block.up = true;
                            actor.y -= overlap.y;
                        }
                        else if (actor.sprite.collision.center.y > this.center.y && !actor.block.down) {
                            actor.block.down = true;
                            actor.y += overlap.y;
                        }
                    }
                    else {
                        if (actor.sprite.collision.center.x <= this.center.x && !actor.block.left) {
                            actor.block.left = true;
                            actor.x -= overlap.x;
                        }
                        else if (actor.sprite.collision.center.x > this.center.x && !actor.block.right) {
                            actor.block.right = true;
                            actor.x += overlap.x;
                        }
                    }
                }
            }
            actor.block = {
                left: false,
                up: false,
                right: false,
                down: false
            };
        };
        return Block;
    }());
    cosmo.Block = Block;
    var Button = /** @class */ (function () {
        function Button() {
        }
        return Button;
    }());
    cosmo.Button = Button;
    var Game = /** @class */ (function () {
        function Game(set) {
            cosmo.game = this;
            var set = set || {};
            this.screen = set.screen || new cosmo.Screen();
            this.scene = set.scene || new cosmo.Scene();
        }
        Game.prototype.loop = function () { };
        Game.prototype.play = function () {
            cosmo.play(this);
        };
        Game.prototype.update = function () {
            this.loop();
            this.scene.update();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.update();
            }
            //
            this.screen.update();
        };
        Game.prototype.render = function () {
            this.scene.render();
            // Test:
            if (cosmo.test.active) {
                cosmo.test.render();
            }
            //
            this.screen.render();
        };
        return Game;
    }());
    cosmo.Game = Game;
    var Scene = /** @class */ (function () {
        function Scene(set) {
            if (set === void 0) { set = {}; }
            var _this = this;
            this.name = set.name || 'Map';
            this.x = set.x || 0;
            this.y = set.y || 0;
            this.size = {
                width: set.width || cosmo.game.screen.size.width,
                height: set.height || cosmo.game.screen.size.height
            };
            this.actor = [];
            if (set.actor !== undefined) {
                set.actor.forEach(function (actor) {
                    _this.add(actor);
                });
            }
            this.tiles = set.tiles || [[], []];
            this.background = {
                color: set.background_color || "#FFFFFF",
                image: set.background_image || [],
                music: set.background_music || null
            };
        }
        Scene.prototype.add = function (element, set) {
            if (set === void 0) { set = {}; }
            switch (Object.getPrototypeOf(element)) {
                case cosmo.Actor.prototype:
                    if (element.unique)
                        this.actor.push(element);
                    else
                        this.actor.push(Object.assign(new cosmo.Actor(), element));
                    var actor = this.actor[this.actor.length - 1];
                    actor.start();
                    actor.x = set[0] || set.x || actor.x;
                    actor.y = set[1] || set.y || actor.y;
                    break;
                case cosmo.Tiles.prototype:
                    this.tiles[set.layer || 0].push(element);
                    break;
            }
        };
        Scene.prototype.update = function () {
            this.actor.forEach(function (actor) {
                actor.update();
            });
            this.tiles[0].forEach(function (tiles) {
                tiles.update();
            });
            this.tiles[1].forEach(function (tiles) {
                tiles.update();
            });
        };
        Scene.prototype.render = function () {
            //game.screen.buffer_context.fillStyle = this.background.color;
            //game.screen.buffer_context.fillRect(0, 0, game.screen.size.width, game.screen.size.height);
            this.tiles[0].forEach(function (tiles) {
                tiles.render();
            });
            this.actor.forEach(function (actor) {
                actor.render();
            });
            this.tiles[1].forEach(function (tiles) {
                tiles.render();
            });
        };
        return Scene;
    }());
    cosmo.Scene = Scene;
    var Screen = /** @class */ (function () {
        function Screen(set) {
            var set = set || {};
            this.main_canvas = document.createElement('canvas');
            var css = "display: block;" +
                "margin: auto;" +
                "width: 100%;" +
                "-ms-interpolation-mode: nearest-neighbor;" +
                "image-rendering: -webkit-optimize-contrast;" +
                "image-rendering: -webkit-crisp-edges;" +
                "image-rendering: -moz-crisp-edges;" +
                "image-rendering: -o-crisp-edges; " +
                "image-rendering: pixelated;";
            this.main_canvas.setAttribute("style", css);
            this.buffer_canvas = document.createElement('canvas');
            var content = document.getElementById(set.content) || document.body;
            css = "margin: 0;" +
                "padding: 0;" +
                "overflow: hidden;";
            content.setAttribute("style", css);
            this.size = {
                device: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                },
                content: {
                    width: set.content === undefined ? document.documentElement.clientWidth : content.offsetWidth,
                    height: set.content === undefined ? document.documentElement.clientHeight : content.offsetHeight
                }
            };
            var resolution = set.resolution || cosmo.QVGA;
            var orientation = set.orientation || document.documentElement.clientWidth >= document.documentElement.clientHeight;
            this.size.width = orientation ? resolution[0] : resolution[1];
            this.size.height =
                (set.auto_height === undefined) || (set.auto_height === false) ?
                    (orientation ? resolution[1] : resolution[0]) :
                    (this.size.width * (this.size.content.height / this.size.content.width));
            this.main_canvas.width = this.buffer_canvas.width = this.size.width;
            this.main_canvas.height = this.buffer_canvas.height = this.size.height;
            this.main_context = this.main_canvas.getContext('2d');
            this.buffer_context = this.buffer_canvas.getContext('2d');
            content.appendChild(this.main_canvas);
            var top_bottom = Math.round(this.size.height * 0.1);
            var left_right = Math.round(this.size.width * 0.1);
            this.camera = {
                top: set.camera_top || top_bottom,
                bottom: set.camera_bottom || top_bottom,
                left: set.camera_left || left_right,
                right: set.camera_right || left_right,
                actor: set.camera_actor || undefined
            };
        }
        Screen.prototype.update = function () {
            if (this.camera.actor !== undefined) {
                if (this.camera.actor.x < this.camera.left - cosmo.game.scene.x && cosmo.game.scene.x < 0) {
                    cosmo.game.scene.x = -(this.camera.actor.x - this.camera.left);
                }
                else if (this.camera.actor.x > (this.size.width - this.camera.right) - cosmo.game.scene.x && cosmo.game.scene.x > -(cosmo.game.scene.size.width - this.size.width)) {
                    cosmo.game.scene.x = -(this.camera.actor.x - (this.size.width - this.camera.right));
                }
                if (this.camera.actor.y < this.camera.top - cosmo.game.scene.y && cosmo.game.scene.y < 0) {
                    cosmo.game.scene.y = -(this.camera.actor.y - this.camera.top);
                }
                else if (this.camera.actor.y > (this.size.height - this.camera.bottom) - cosmo.game.scene.y && cosmo.game.scene.y > -(cosmo.game.scene.size.height - this.size.height)) {
                    cosmo.game.scene.y = -(this.camera.actor.y - (this.size.height - this.camera.bottom));
                }
            }
        };
        Screen.prototype.render = function () {
            this.main_context.clearRect(0, 0, this.size.width, this.size.height);
            this.main_context.drawImage(this.buffer_canvas, 0, 0);
            this.buffer_context.clearRect(0, 0, this.size.width, this.size.height);
        };
        return Screen;
    }());
    cosmo.Screen = Screen;
    var Sound = /** @class */ (function () {
        function Sound(set) {
            var set = set || {};
            this.audio = set.audio || new HTMLAudioElement();
            this.audio.volume = set.volume || 1;
            this.audio.loop = set.loop === undefined ? false : set.loop;
            this.play = this.audio.play;
            this.pause = this.audio.pause;
        }
        Sound.prototype.play = function () { };
        Sound.prototype.pause = function () { };
        Sound.prototype.replay = function () {
            this.audio.currentTime = 0;
            this.play();
        };
        Sound.prototype.set_volume = function (volume) {
            this.audio.volume = volume;
            this.audio.load();
        };
        return Sound;
    }());
    cosmo.Sound = Sound;
    var Sprite = /** @class */ (function () {
        function Sprite(set) {
            if (set === void 0) { set = {}; }
            var _this = this;
            this.image = new Image();
            this.image.src = set.image || null;
            this.animation = {
                frames: set.animation_frames || 1,
                speed: set.animation_speed || 1,
                current_frame: 0,
                fix: set.animation_fix || false,
                over_action: set.over_action || function () { }
            };
            this.scale = {
                x: set.scale_x || 1,
                y: set.scale_y || 1
            };
            this.rotation = set.rotation || 0;
            this.opacity = set.opacity || 1;
            this.size = {
                width: 0,
                height: 0
            };
            this.origin = {
                x: 0,
                y: 0
            };
            this.collision = {
                rect: {
                    x: set.collision_x || 0,
                    y: set.collision_y || 0,
                    width: 0,
                    height: 0
                },
                half: {
                    width: 0,
                    height: 0
                },
                center: {
                    x: 0,
                    y: 0
                }
            };
            this.image.onload = function () {
                _this.size = {
                    width: _this.image.width / _this.animation.frames,
                    height: _this.image.height
                };
                _this.origin = {
                    x: set.origin_x || Math.round(_this.size.width / 2),
                    y: set.origin_y || Math.round(_this.size.height / 2)
                };
                _this.collision.rect.width = set.collision_width || _this.size.width;
                _this.collision.rect.height = set.collision_height || _this.size.height;
                _this.collision.half = {
                    width: _this.collision.rect.width / 2,
                    height: _this.collision.rect.height / 2
                };
            };
        }
        Sprite.prototype.update = function (x, y) {
            this.collision.center.x = x + cosmo.game.scene.x + this.collision.rect.x + this.collision.half.width - this.origin.x;
            this.collision.center.y = y + cosmo.game.scene.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
        };
        Sprite.prototype.render = function (x, y) {
            var index = 0, next_frame = 0;
            if (this.animation.frames === 1)
                index = 0;
            else if (this.animation.fix !== false)
                index = this.animation.fix;
            else {
                next_frame = this.animation.current_frame + this.animation.speed * (this.animation.frames / cosmo.time.fps);
                if (next_frame >= this.animation.frames) {
                    this.animation.current_frame = 0;
                    if (this.animation.endAction)
                        this.animation.endAction();
                }
                else
                    this.animation.current_frame = next_frame;
                index = Math.floor(this.animation.current_frame);
            }
            var buffer = cosmo.game.screen.buffer_context;
            buffer.save();
            buffer.translate(x + cosmo.game.scene.x, y + cosmo.game.scene.y);
            buffer.rotate(Math.PI / 180 * this.rotation);
            buffer.globalAlpha = this.opacity;
            buffer.drawImage(this.image, index * this.size.width, 0, this.size.width, this.size.height, -this.origin.x, -this.origin.y, this.size.width * this.scale.x, this.size.height * this.scale.y);
            buffer.restore();
        };
        return Sprite;
    }());
    cosmo.Sprite = Sprite;
    var Tiles = /** @class */ (function () {
        function Tiles(set) {
            if (set === void 0) { set = {}; }
            var _this = this;
            this.image = new Image();
            this.image.src = set.image;
            this.image.onload = function () {
                _this.size = {
                    rows: set.rows || 1,
                    columns: set.columns || 1,
                    width: Math.round(_this.image.width / (set.columns || 1)),
                    height: Math.round(_this.image.height / (set.rows || 1))
                };
                if (set.matrix !== undefined) {
                    _this.setTileMap(set.matrix);
                    if (set.block !== undefined) {
                        _this.tileBlock = set.block;
                        _this.blockMap = [];
                        _this.setBlockMap(set.matrix);
                    }
                }
            };
        }
        Tiles.prototype.setTileMap = function (matrix) {
            this.tileMap = document.createElement('canvas');
            this.tileMap.width = 0;
            this.tileMap.height = 0;
            for (var i in matrix) {
                if (matrix[i][2] >= this.tileMap.width) {
                    this.tileMap.width = matrix[i][2] + this.size.width;
                }
                if (matrix[i][3] >= this.tileMap.height) {
                    this.tileMap.height = matrix[i][3] + this.size.height;
                }
            }
            var buffer_context = this.tileMap.getContext('2d');
            for (var i in matrix) {
                buffer_context.drawImage(this.image, matrix[i][0] * this.size.width, matrix[i][1] * this.size.height, this.size.width, this.size.height, matrix[i][2], matrix[i][3], this.size.width, this.size.height);
            }
        };
        Tiles.prototype.setBlockMap = function (matrix) {
            var _this_1 = this;
            var cells = [];
            matrix.forEach(function (element) {
                if (_this_1.tileBlock[element[0], element[1]]) {
                    cells.push({ x: element[2], y: element[3] });
                }
            });
            cells.sort(function (a, b) {
                return a.x - b.x;
            });
            cells.sort(function (a, b) {
                return a.y - b.y;
            });
            var rows = [];
            var temp = {};
            cells.forEach(function (cell) {
                if (temp.x1 === undefined) {
                    temp = {
                        x1: cell.x,
                        y1: cell.y,
                        x2: cell.x + _this_1.size.width,
                        y2: cell.y + _this_1.size.height
                    };
                }
                else {
                    if (temp.x2 === cell.x && temp.y1 === cell.y) {
                        temp.x2 = cell.x + _this_1.size.width;
                    }
                    else {
                        rows.push(temp);
                        temp = {
                            x1: cell.x,
                            y1: cell.y,
                            x2: cell.x + _this_1.size.width,
                            y2: cell.y + _this_1.size.height
                        };
                    }
                }
            });
            rows.push(temp);
            rows.sort(function (a, b) {
                return a.x2 - b.x2;
            });
            rows.sort(function (a, b) {
                return a.x1 - b.x1;
            });
            var columns = [];
            temp = {};
            rows.forEach(function (row) {
                if (temp.x1 === undefined) {
                    temp = row;
                }
                else {
                    if (row.y1 === temp.y2 && row.x2 === temp.x2) {
                        temp.y2 = row.y2;
                    }
                    else {
                        columns.push(temp);
                        temp = row;
                    }
                }
            });
            columns.push(temp);
            columns.forEach(function (block) {
                _this_1.blockMap.push(new cosmo.Block({
                    x: block.x1,
                    y: block.y1,
                    width: block.x2 - block.x1,
                    height: block.y2 - block.y1
                }));
            });
        };
        Tiles.prototype.update = function () {
            if (this.blockMap) {
                this.blockMap.forEach(function (block) {
                    block.update();
                });
            }
        };
        Tiles.prototype.render = function () {
            if (this.tileMap) {
                cosmo.game.screen.buffer_context.drawImage(this.tileMap, cosmo.game.scene.x, cosmo.game.scene.y);
            }
        };
        return Tiles;
    }());
    cosmo.Tiles = Tiles;
})(cosmo || (cosmo = {}));
