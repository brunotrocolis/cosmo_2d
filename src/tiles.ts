module cosmo {
    export class Tiles {

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
            //Ler células:
            var cells: { [key: string]: number }[] = [];
            matrix.forEach(element => {
                if (this.tileBlock[element[0], element[1]]) {
                    cells.push({ x: element[2], y: element[3] });
                }
            });
            cells.sort(function (a, b) {
                return a.x - b.x;
            });
            cells.sort(function (a, b) {
                return a.y - b.y;
            });
            //Ler linhas:
            var rows: { [key: string]: number }[] = [];
            var temp: { [key: string]: number } = {};

            cells.forEach(cell => {
                if (temp.x1 === undefined) {
                    temp = {
                        x1: cell.x,
                        y1: cell.y,
                        x2: cell.x + this.size.width,
                        y2: cell.y + this.size.height
                    }
                } else {
                    if (temp.x2 === cell.x && temp.y1 === cell.y) {
                        temp.x2 = cell.x + this.size.width;
                    } else {
                        rows.push(temp);
                        temp = {
                            x1: cell.x,
                            y1: cell.y,
                            x2: cell.x + this.size.width,
                            y2: cell.y + this.size.height
                        }
                    }
                }
            });
            rows.push(temp);
            //Ler Colunas:
            rows.sort(function (a, b) {
                return a.x2 - b.x2;
            });
            rows.sort(function (a, b) {
                return a.x1 - b.x1;
            });
            var columns: { [key: string]: number }[] = [];
            temp = {};
            rows.forEach(row => {
                if (temp.x1 === undefined) {
                    temp = row;
                } else {
                    if (row.y1 === temp.y2 && row.x2 === temp.x2) {
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