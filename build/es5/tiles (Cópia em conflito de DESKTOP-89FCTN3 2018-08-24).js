var cosmo;
(function (cosmo) {
    var Tiles = /** @class */ (function () {
        function Tiles(set) {
            if (set === void 0) { set = {}; }
            this.VERSION = '3.0.2';
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
                if (_this_1.tileBlock[element[1]][element[0]]) {
                    cells.push({ x1: element[2], y1: element[3], x2: element[2] + _this_1.size.width, y2: element[3] + _this_1.size.height });
                }
            });
            console.log(cells);
            cells.sort(function (a, b) {
                return a.x1 - b.x1;
            });
            cells.sort(function (a, b) {
                return a.y1 - b.y1;
            });
            console.log(cells);
            var rows = [];
            var temp = {};
            cells.forEach(function (cell) {
                if (temp === {}) {
                    temp = cell;
                }
                else {
                    if (temp.x2 === cell.x1 && temp.y1 === cell.x1) {
                        temp.x2 = cell.x2;
                    }
                    else {
                        rows.push(temp);
                        temp = cell;
                    }
                }
            });
            rows.push(temp);
            rows.forEach(function (block) {
                _this_1.blockMap.push(new cosmo.Block({
                    x: block.x1,
                    y: block.y1,
                    width: block.x2 - block.x1,
                    height: block.y2 - block.y1
                }));
            });
            // cells.sort(function (a, b) {
            //     return a.x - b.x;
            // });
            // cells.sort(function (a, b) {
            //     return a.y - b.y;
            // });
            // var rows: { [key: string]: number }[] = [];
            // var temp: { [key: string]: number } = {};
            // console.log(cells);
            // cells.forEach(cell => {
            //     if (temp.x1 === undefined) {
            //         temp = {
            //             x1: cell.x,
            //             y1: cell.y,
            //             x2: cell.x + this.size.width,
            //             y2: cell.y + this.size.height
            //         }
            //     } else {
            //         if (temp.x2 === cell.x && temp.y1 === cell.y) {
            //             temp.x2 = cell.x + this.size.width;
            //         } else {
            //             rows.push(temp);
            //             temp = {
            //                 x1: cell.x,
            //                 y1: cell.y,
            //                 x2: cell.x + this.size.width,
            //                 y2: cell.y + this.size.height
            //             }
            //         }
            //     }
            // });
            // rows.push(temp);
            // console.log(rows);
            // rows.sort(function (a, b) {
            //     return a.x2 - b.x2;
            // });
            // rows.sort(function (a, b) {
            //     return a.x1 - b.x1;
            // });
            // var columns: { [key: string]: number }[] = [];
            // temp = {};
            // rows.forEach(row => {
            //     if (temp.x1 === undefined) {
            //         temp = row;
            //     } else {
            //         if (row.y1 === temp.y2 && row.x2 === temp.x2) {
            //             temp.y2 = row.y2;
            //         } else {
            //             columns.push(temp);
            //             temp = row;
            //         }
            //     }
            // });
            // //console.log(rows);
            // columns.push(temp);
            // columns.forEach(block => {
            //     this.blockMap.push(new Block({
            //         x: block.x1,
            //         y: block.y1,
            //         width: block.x2 - block.x1,
            //         height: block.y2 - block.y1
            //     }));
            // });
            //console.log(columns);
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
