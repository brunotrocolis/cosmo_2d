//--------------------------------------------------------------------------------------------------------------
//Tileset ------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
cosmo.Tileset = function (src, rows, columns, matrix) {
    this.image = cosmo.res(src);
    this.size = {
        rows: rows,
        columns: columns,
        width: this.image.width / columns,
        height: this.image.height / rows
    }
    this.matrix = matrix;
    this.buffer = document.createElement('canvas');
    this.buffer.width = 0;
    this.buffer.height = 0;
    for (var i in this.matrix) {
        if (this.matrix[i][1] >= this.buffer.width)
            this.buffer.width = this.matrix[i][1] + this.size.width;
        if (this.matrix[i][2] >= this.buffer.height)
            this.buffer.height = this.matrix[i][2] + this.size.height;
    }
    this.bufferContext = this.buffer.getContext('2d');
    for (var i in this.matrix) {
        this.bufferContext.drawImage(
            this.image,
            (this.matrix[i][0] % this.size.columns) * this.size.width,
            (Math.floor(this.matrix[i][0] / this.size.columns)) * this.size.height,
            this.size.width,
            this.size.height,
            this.matrix[i][1],
            this.matrix[i][2],
            this.size.width,
            this.size.height
        );
    }
} 
cosmo.Tileset.prototype = {
    render: function (map) {
        cosmo.gameScreen.bufferContext.drawImage(this.buffer, mainScene.x, mainScene.y);
    }
}