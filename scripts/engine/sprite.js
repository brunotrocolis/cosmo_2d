//--------------------------------------------------------------------------------------------------------------
//Sprite--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function Sprite(src, animationFrames, animationSpeed, colisionRect, origin, scale, rotation) {
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
    this.colision = {
        rect: colisionRect || { x: 0, y: 0, width: this.size.width, height: this.size.height },
        half: null,
        center: { x: 0, y: 0 }
    };
    this.colision.half = { width: this.colision.rect.width / 2, height: this.colision.rect.height / 2 };
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
        GameScreen.bufferContext.save();
        GameScreen.bufferContext.translate(x + mainScene.x, y + mainScene.y);
        GameScreen.bufferContext.rotate(Math.PI / 180 * this.rotation);
        GameScreen.bufferContext.drawImage(
            this.image,
            index * this.size.width,
            0,
            this.size.width,
            this.size.height,
            -this.origin.x,
            -this.origin.y,
            this.size.width * this.scale.x,
            this.size.height * this.scale.y);
        GameScreen.bufferContext.restore();
    },
    update: function (x, y) {
        //Calcular centro de colisão:
        this.colision.center.x = x + mainScene.x + this.colision.rect.x + this.colision.half.width - this.origin.x;
        this.colision.center.y = y + mainScene.y + this.colision.rect.y + this.colision.half.height - this.origin.y;
    }
}