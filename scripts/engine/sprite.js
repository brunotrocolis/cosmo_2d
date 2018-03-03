//--------------------------------------------------------------------------------------------------------------
//Sprite--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function Sprite(src, animationFrames, animationSpeed, collisionRect, origin, scale, rotation) {
    this.image = file(src);
    this.animation = {
        frames: animationFrames || 1,
        speed: animationSpeed || 1,
        currentFrame: 0,
        fix: false,
        endAction: null
    };
    this.scale = scale || { x: 1, y: 1 };
    this.rotation = rotation || 0;
    this.visible = true;
    this.size = { width: this.image.width / this.animation.frames, height: this.image.height };
    this.origin = origin || { x: Math.round(this.size.width / 2), y: Math.round(this.size.height / 2) };
    this.collision = {
        rect: collisionRect || { x: 0, y: 0, width: this.size.width, height: this.size.height },
        half: null,
        center: { x: 0, y: 0 }
    };
    this.collision.half = { width: this.collision.rect.width / 2, height: this.collision.rect.height / 2 };
} Sprite.prototype = {
    render: function (x, y) {
        //Calcular frame da animação:
        var index = 0, nextFrame = 0;

        if (this.animation.frames === 1)
            index = 0;
        else if (this.animation.fix !== false)
            index = this.animation.fix;
        else {
            nextFrame = this.animation.currentFrame + this.animation.speed * (this.animation.frames / time.fps);
            if (nextFrame >= this.animation.frames) {
                this.animation.currentFrame = 0;
                if (this.animation.endAction) this.animation.endAction();
            } else
                this.animation.currentFrame = nextFrame;
            index = Math.floor(this.animation.currentFrame);
        }

        //Desenhar Frame na tela:
        gameScreen.bufferContext.save();
        gameScreen.bufferContext.translate(x + mainScene.x, y + mainScene.y);
        gameScreen.bufferContext.rotate(Math.PI / 180 * this.rotation);
        gameScreen.bufferContext.drawImage(
            this.image,
            index * this.size.width,
            0,
            this.size.width,
            this.size.height,
            -this.origin.x,
            -this.origin.y,
            this.size.width * this.scale.x,
            this.size.height * this.scale.y);
        gameScreen.bufferContext.restore();
    },
    update: function (x, y) {
        //Calcular centro de colisão:
        this.collision.center.x = x + mainScene.x + this.collision.rect.x + this.collision.half.width - this.origin.x;
        this.collision.center.y = y + mainScene.y + this.collision.rect.y + this.collision.half.height - this.origin.y;
    }
}