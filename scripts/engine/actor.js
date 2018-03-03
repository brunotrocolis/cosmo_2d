//--------------------------------------------------------------------------------------------------------------
//Actor --------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function Actor(name, sprite, unique, persistent, solid, onCreate, loop, onDestroy) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.sprite = sprite || null;
    this.unique = unique || false;
    this.persistent = persistent || false;
    this.solid = solid || true;
    this.onCreate = onCreate || null;
    this.loop = loop || null;
    this.onDestroy = onDestroy || null;

    this.waiting = false;
    this.moving = { x: null, y: null, speed: null, type: null, enable: false, overAction: null, DIAGONAL: 1, YX: 2, XY: 3 };
    this.block = { left: false, up: false, right: false, down: false };
} Actor.prototype = {
    onCollision: function (actor, x, y) {
        if (actor) {
            if (typeof actor == 'object') {
                var legX = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
                var legY = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
                var reachX = this.sprite.collision.half.width + actor.sprite.collision.half.width;
                var reachY = this.sprite.collision.half.height + actor.sprite.collision.half.height;
                if (legX < reachX && legY < reachY)
                    return true;
                else
                    return false;
            } else if (typeof actor == 'string') {
                var temp = this.onCollision();
                if (temp) {
                    if (temp.name == actor)
                        return true;
                    else
                        return false;
                }
            }
        } else {
            for (var i in mainScene.actor) {
                if (this !== mainScene.actor[i] && this.onCollision(mainScene.actor[i], x, y))
                    return mainScene.actor[i];
            }
            return false;
        }
    },
    onTouch: function () {
        for (var i in touch) {
            if (this.sprite.collision.center.x - this.sprite.collision.half.width < touch[i].x &&
                this.sprite.collision.center.x + this.sprite.collision.half.width > touch[i].x &&
                this.sprite.collision.center.y - this.sprite.collision.half.height < touch[i].y &&
                this.sprite.collision.center.y + this.sprite.collision.half.height > touch[i].y)
                return true;
        }
        return false;
    },
    push: function (actor) {
        if (actor) {
            var legX = Math.abs(this.sprite.collision.center.x - actor.sprite.collision.center.x);
            var legY = Math.abs(this.sprite.collision.center.y - actor.sprite.collision.center.y);
            var reachX = this.sprite.collision.half.width + actor.sprite.collision.half.width;
            var reachY = this.sprite.collision.half.height + actor.sprite.collision.half.height;
            if (legX < reachX && legY < reachY) {
                var overlap = { x: reachX - legX, y: reachY - legY }
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
                if (actor.moving.enable)
                    this.moving = { x: null, y: null, speed: null, type: null, enable: false, DIAGONAL: 1, YX: 2, XY: 3 };
            }
        } else {
            for (var i in mainScene.actor) {
                if (this !== mainScene.actor[i])
                    this.push(mainScene.actor[i]);
            }
        }
    },
    wait: function (time, action) {
        if (this.waiting) {
            if (performance.now() - this.waitingLastTime >= this.waitingTime) {
                this.waiting = false;
                this.waitingAction(this);
            }
        } else {
            this.waiting = true;
            this.waitingLastTime = performance.now();
            this.waitingTime = time * 500;
            this.waitingAction = action;
        }
    },
    bullet: function (angle, speed) {
        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(-angle) * speed;
    },
    lookAt: function (actor) {
        return Math.atan2((this.y - actor.y), (actor.x - this.x));
    },
    moveTo: function (x, y, speed, type, overAction) {
        if (this.moving.enable == true) {
            switch (this.moving.type) {
                case 1:
                    if ((this.moving.x - this.moving.speed > this.x || this.x > this.moving.x + this.moving.speed) &&
                        (this.moving.y - this.moving.speed > this.y || this.y > this.moving.y + this.moving.speed))
                        this.bullet(this.lookAt({ y: this.moving.y, x: this.moving.x }), this.moving.speed);
                    else
                        this.breakMove();
                    break;
                case 2:
                    if (this.moving.y - this.moving.speed > this.y || this.y > this.moving.y + this.moving.speed)
                        this.y += this.moving.speed * Math.sign(this.moving.y - this.y);
                    else if (this.moving.x - this.moving.speed > this.x || this.x > this.moving.x + this.moving.speed)
                        this.x += this.moving.speed * Math.sign(this.moving.x - this.x);
                    else
                        this.breakMove();
                    break;
                case 3:
                    if (this.moving.x - this.moving.speed > this.x || this.x > this.moving.x + this.moving.speed)
                        this.x += this.moving.speed * Math.sign(this.moving.x - this.x);
                    else if (this.moving.y - this.moving.speed > this.y || this.y > this.moving.y + this.moving.speed)
                        this.y += this.moving.speed * Math.sign(this.moving.y - this.y);
                    else {
                        this.breakMove();
                    }
                    break;
            }
        } else {
            this.moving.x = x;
            this.moving.y = y;
            this.moving.speed = speed || 1;
            this.moving.type = type || 1;
            this.moving.overAction = overAction || null;
            this.moving.enable = true;
        }
    },
    breakMove: function () {
        this.moving.enable = false;
        if (this.moving.overAction) this.moving.overAction(this);
    },
    onScreen: function () {
        if (this.sprite) {
            var x1 = this.x - this.sprite.origin.x + mainScene.x;
            var x2 = this.x + this.sprite.size.width - this.sprite.origin.x + mainScene.x;
            var y1 = this.y - this.sprite.origin.y + mainScene.y;
            var y2 = this.y + this.sprite.size.height - this.sprite.origin.y + mainScene.y;
            if (x2 < 0 || x1 > gameScreen.size.width || y2 < 0 || y1 > gameScreen.size.height)
                return false;
        } else {
            if (this.x < 0 || this.x > gameScreen.size.width || this.y < 0 || this.y > gameScreen.size.height)
                return false;
        }
        return true;
    },
    goMap: function (map, x, y) {
        if (map.actor.indexOf(this) != -1)
            map.actor.splice(map.actor.indexOf(this), 1);
        map.addActor(this, x || this.x, y || this.y);
        mainScene = map;
    },
    render: function () {
        if (this.sprite && this.sprite.visible)
            this.sprite.render(this.x, this.y);
    },
    update: function () {
        if (this.waiting)
            this.wait();
        if (this.moving.enable)
            this.moveTo();
        if (this.loop)
            this.loop(this);
        if (this.sprite)
            this.sprite.update(this.x, this.y);
        this.block = { left: false, up: false, right: false, down: false };
    }
}