//--------------------------------------------------------------------------------------------------------------
//Cenário ---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
cosmo.Scene = function (width, height) {
    this.x = 0;
    this.y = 0;
    this.size = { width: width || cosmo.gameScreen.size.width, height: height || cosmo.gameScreen.size.height };
    this.actor = new Array();
    this.tileset = [new Array(), new Array()];
    this.virtualGamepad = null;
    this.blockRect = new Array();

    this.backgroundColor = 'rgb(0,162,232)';
    this.backgroundImage = new Array();
    this.backgroundMusic = null;
} 
cosmo.Scene.prototype = {
    loop: null,
    addBackgroundImage: function (src, repeat) {
        var image = res(src);
        if (repeat) {
            if (this.size.width <= image.width && this.size.height <= image.height)
                this.backgroundImage.push(image);
            else {
                var buffer = document.createElement('canvas');
                buffer.width = this.size.width;
                buffer.height = this.size.height;
                var bufferContext = buffer.getContext('2d');
                for (var y = 0; y < this.size.height; y += image.height) {
                    for (var x = 0; x < this.size.width; x += image.width) {
                        bufferContext.drawImage(image, x, y);
                    }
                }
                this.backgroundImage.push(buffer);
            }
        } else
            this.backgroundImage.push(image);
    },
    setBackgroundMusic: function (src, volume, loop) {
        this.backgroundMusic = new Audio(src);
        this.backgroundMusic.volume = volume || 0.4;
        this.backgroundMusic.loop = loop || true;
        this.backgroundMusic.load();
        this.backgroundMusic.play();
    },
    addActor: function (actor, x, y) {
        if (actor.unique)
            this.actor.push(actor);
        else
            this.actor.push(clone(actor));
        if (this.actor[this.actor.length - 1].onCreate)
            this.actor[this.actor.length - 1].onCreate(this.actor[this.actor.length - 1]);
        this.actor[this.actor.length - 1].x = x || this.actor[this.actor.length - 1].x;
        this.actor[this.actor.length - 1].y = y || this.actor[this.actor.length - 1].y;
    },
    removeActor: function (actor) {
        var index = this.actor.indexOf(actor);
        if (this.actor[index].onDestroy)
            this.actor[index].onDestroy(this.actor[index]);
        this.actor.splice(index, 1);
    },
    addTileset: function (tileset, index) {
        this.tileset[index].push(tileset);
    },
    setVirtualGamepad: function (virtualGamepad) {
        this.virtualGamepad = virtualGamepad;
    },
    addBlockRect: function (x, y, width, height, actor) {
        this.blockRect.push(new BlockRect(x, y, width, height, actor || null));
    },
    render: function () {
        cosmo.gameScreen.bufferContext.fillStyle = this.backgroundColor;
        cosmo.gameScreen.bufferContext.fillRect(0, 0, cosmo.gameScreen.size.width, cosmo.gameScreen.size.height);

        for (var i in this.backgroundImage)
        cosmo.gameScreen.bufferContext.drawImage(this.backgroundImage[i], this.x, this.y);
        for (var i in this.tileset[0])
            this.tileset[0][i].render(this);
        for (var i in this.actor)
            if (this.actor[i].onScreen())
                this.actor[i].render();
        for (var i in this.tileset[1])
            this.tileset[1][i].render(this);
        if (this.virtualGamepad)
            this.virtualGamepad[i].render();
    },
    update: function () {
        this.actor.sort(function (a, b) { return a.y - b.y; });
        for (var i in this.actor) {
            if (this.actor[i].onScreen() || this.actor[i].persistent)
                this.actor[i].update();
        }
        if (this.loop)
            this.loop(this);
        for (var i in this.blockRect)
            this.blockRect[i].update();
        if (this.virtualGamepad)
            this.virtualGamepad[i].update();
    }
}