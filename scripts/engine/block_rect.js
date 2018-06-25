//--------------------------------------------------------------------------------------------------------------
//BlockRect ---------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
cosmo.BlockRect = function (x, y, width, height, actor) {
    this.x = x;
    this.y = y;
    this.size = { width: width, height: height };
    this.half = { width: width / 2, height: height / 2 };
    this.center = { x: x + this.half.width, y: y + this.half.height };
    this.actor = actor || null;
} 
cosmo.BlockRect.prototype = {
    block: function (actor) {
        if (actor.solid) {
            var legX = Math.abs(this.center.x - actor.sprite.collision.center.x);
            var legY = Math.abs(this.center.y - actor.sprite.collision.center.y);
            var reachX = this.half.width + actor.sprite.collision.half.width;
            var reachY = this.half.height + actor.sprite.collision.half.height;
            if (legX < reachX && legY < reachY) {
                var overlap = { x: reachX - legX, y: reachY - legY }
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
                if (actor.moving.enable)
                    actor.moving = { x: null, y: null, speed: null, type: null, enable: false, DIAGONAL: 1, YX: 2, XY: 3 };
            }
        }
    },
    update: function () {
        this.center = {
            x: this.x + mainScene.x + this.half.width,
            y: this.y + mainScene.y + this.half.height
        };
        if (this.actor === null) {
            for (var i in mainScene.actor)
                this.block(mainScene.actor[i]);
        } else if (Array.isArray(this.actor)) {
            for (var i in this.actor)
                this.block(this.actor[i]);
        } else {
            this.block(this.actor);
        }
    }
}