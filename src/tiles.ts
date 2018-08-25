module cosmo {
    export class Tiles {
        public VERSION: string = '3.0.2';
        public image: HTMLImageElement;
        public size: { [key: string]: number };
        public tileBlock: boolean[][];
        public tileMap: HTMLCanvasElement;
        public blockMap: Block[];

        constructor(set: { [key: string]: any } = {}) {
            var _this = this;
            this.image = new Image();
            this.image.src = set.image;

            this.image.onload = function () {
                _this.size = {
                    rows: set.rows || 1,
                    columns: set.columns || 1,
                    width: Math.round(_this.image.width / (set.columns || 1)),
                    height: Math.round(_this.image.height / (set.rows || 1))
                }
                if (set.matrix !== undefined) {
                    _this.setTileMap(set.matrix);
                    if (set.block !== undefined) {
                        _this.tileBlock = set.block;
                        _this.blockMap = [];
                        _this.setBlockMap(set.matrix);
                    }
                }
            }
        }

        public setTileMap(matrix: number[][]): void {
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
                buffer_context.drawImage(
                    this.image,
                    matrix[i][0] * this.size.width,
                    matrix[i][1] * this.size.height,
                    this.size.width,
                    this.size.height,
                    matrix[i][2],
                    matrix[i][3],
                    this.size.width,
                    this.size.height
                );
            }
        }

        public setBlockMap(matrix: number[][]) {
            var cells: { [key: string]: number }[] = [];
            matrix.forEach(tiles => {
                if (this.tileBlock[tiles[1]][tiles[0]]) {
                    cells.push({ x1: tiles[2], y1: tiles[3], x2: tiles[2] + this.size.width, y2: tiles[3] + this.size.height });
                }
            });
            cells.sort((cell_1, cell_2) => {
                return cell_1.y1 - cell_2.y1;
            });
            var t = [];
            var t2 = [];
            var l = null;
            cells.forEach(cell => {
                if (l === null) {
                    l = cell.y1;
                }
                if (cell.y1 === l) {
                    t2.push(cell);
                } else {
                    t2.sort((a, b) => {
                        return a.x1 - b.x1;
                    });
                    t.push(t2);
                    l = null;
                    t2 = [];
                    t2.push(cell);
                }
            });
            t.push(t2);
            cells = [];
            t.forEach(row => {
                row.forEach(cell => {
                    cells.push(cell);
                });
            });
            var rows: { [key: string]: number }[] = [];
            var temp: { [key: string]: number } = {};
            cells.forEach(cell => {
                if (temp.x1 === void 0) {
                    temp = cell;
                } else {
                    if (temp.x2 === cell.x1 && temp.y1 === cell.y1) {
                        temp.x2 = cell.x2;
                    } else {
                        rows.push(temp);
                        temp = cell;
                    }
                }
            });
            rows.push(temp);
            rows.sort((row_1, row_2) => {
                return row_1.x1 - row_2.x1;
            });
            var t = [];
            var t2 = [];
            var l = null;
            rows.forEach(row => {
                if (l === null) {
                    l = row.x1;
                }
                if (row.x1 === l) {
                    t2.push(row);
                } else {
                    t2.sort((a, b) => {
                        return a.y1 - b.y1;
                    });
                    t.push(t2);
                    l = null;
                    t2 = [];
                    t2.push(row);
                }
            });
            t.push(t2);
            var columns: { [key: string]: number }[] = [];
            var temp: { [key: string]: number } = {};
            rows.forEach(row => {
                if (temp.x1 === void 0) {
                    temp = row;
                } else {
                    if (temp.y2 === row.y1 && temp.x1 === row.x1 && temp.x2 === row.x2) {
                        temp.y2 = row.y2;
                    } else {
                        columns.push(temp);
                        temp = row;
                    }
                }
            });
            columns.push(temp);
            columns.forEach(block => {
                this.blockMap.push(new Block({
                    x: block.x1,
                    y: block.y1,
                    width: block.x2 - block.x1,
                    height: block.y2 - block.y1
                }));
            });
        }

        public update(): void {
            if (this.blockMap) {
                this.blockMap.forEach(block => {
                    block.update();
                });
            }
        }

        public render(): void {
            if (this.tileMap) {
                game.screen.buffer_context.drawImage(this.tileMap, game.scene.x, game.scene.y);
            }
        }
    }
}