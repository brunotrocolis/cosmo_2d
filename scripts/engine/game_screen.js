function GameScreen(resolution, orientation, autoHeight, content, interpolation) {
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
GameScreen.prototype.update = function () {

}
GameScreen.prototype.render = function () {
    this.mainContext.drawImage(this.bufferCanvas, 0, 0);
}