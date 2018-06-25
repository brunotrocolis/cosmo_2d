cosmo.GameScreen = function GameScreen(resolution, orientation, autoHeight, content, interpolation) {
    this.mainCanvas = document.createElement('canvas');
    this.bufferCanvas = document.createElement('canvas');
    //dimensionar canvas
    this.size = {};
    if (orientation) {
        this.size = {
            width: resolution[0],
            height: resolution[1],
            deviceWidth: document.documentElement.clientWidth,
            deviceHeight: document.documentElement.clientHeight
        }
    } else {
        this.size = {
            width: resolution[1],
            height: resolution[0],
            deviceWidth: document.documentElement.clientHeight,
            deviceHeight: document.documentElement.clientWidth
        }
    }
    if (autoHeight) {
        this.size.height = this.size.width * (this.size.deviceHeight / this.size.deviceWidth);
    }
    this.mainCanvas.width = this.bufferCanvas.width = this.size.width;
    this.mainCanvas.height = this.bufferCanvas.height = this.size.height;
    this.mainContext = this.mainCanvas.getContext('2d');
    this.bufferContext = this.bufferCanvas.getContext('2d');

    if (content) {
        document.getElementById(content).appendChild(this.mainCanvas);
    } else {
        document.body.appendChild(this.mainCanvas);
    }
}
cosmo.GameScreen.prototype.update = function () {

}
cosmo.GameScreen.prototype.drawImage = function (image, x, y, scaleX, scaleY, rotation, opacity, originX, originY) {
    image = file(image);
    this.bufferContext.save();
    this.bufferContext.translate(x, y);
    this.bufferContext.rotate((Math.PI / 180 * rotation) || 0);
    this.bufferContext.globalAlpha = opacity || 1;
    this.bufferContext.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        -Math.round((originX || (image.width / 2)) * (scaleX || 1)),
        -Math.round((originY || (image.height / 2)) * (scaleY || 1)),
        Math.round(image.width * (scaleX || 1)),
        Math.round(image.height * (scaleY || 1))
    );
    this.bufferContext.restore();
}
cosmo.GameScreen.prototype.drawSprite = function (sprite, x, y){
    sprite.update(x, y);
    sprite.render(x, y);
}
cosmo.GameScreen.prototype.onTouch = function () {
    for (var i in touch) {
        if (0 < touch[i].x &&
            this.size.width > touch[i].x &&
            0 < touch[i].y &&
            this.size.height > touch[i].y)
            return true;
    }
    return false;
}
cosmo.GameScreen.prototype.drawText = function (text, x, y, size, font, fill, stroke, lineWidth, align) {
    if(fill === null || fill === 'none') fill = '#0000';
    if(stroke === null || stroke === 'none') stroke = '#0000';
    this.bufferContext.save();
    this.bufferContext.font = (size || '10') + "px " + (font || 'sans-serif');
    this.bufferContext.fillStyle = fill || '#000';
    this.bufferContext.strokeStyle = stroke || '#0000';
    this.bufferContext.textAlign = align || 'start';
    this.bufferContext.lineWidth = lineWidth || 1;
    this.bufferContext.fillText(text, x, y);
    this.bufferContext.strokeText(text, x, y);
    this.bufferContext.restore();
}
cosmo.GameScreen.prototype.render = function () {
    this.mainContext.drawImage(this.bufferCanvas, 0, 0);
}