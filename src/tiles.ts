import { state } from './state';
import { Block } from './block';

export type TileMatrix = [number, number, number, number][];
export type TileBlockDef = boolean[][];

export interface TilesOptions {
  image: string;
  rows?: number;
  columns?: number;
  matrix?: TileMatrix;
  block?: TileBlockDef;
}

export class Tiles {
  image: HTMLImageElement;
  size!: { rows: number; columns: number; width: number; height: number };
  tileMap!: HTMLCanvasElement;
  blockMap?: Block[];
  tileBlock?: TileBlockDef;

  constructor(set: TilesOptions) {
    this.image = new Image();
    this.image.src = set.image;
    this.image.onload = () => {
      this.size = {
        rows: set.rows ?? 1,
        columns: set.columns ?? 1,
        width: Math.round(this.image.width / (set.columns ?? 1)),
        height: Math.round(this.image.height / (set.rows ?? 1)),
      };
      if (set.matrix) {
        this.setTileMap(set.matrix);
        if (set.block) {
          this.tileBlock = set.block;
          this.blockMap = [];
          this.setBlockMap(set.matrix);
        }
      }
    };
  }

  setTileMap(matrix: TileMatrix): void {
    this.tileMap = document.createElement('canvas');
    this.tileMap.width = 0;
    this.tileMap.height = 0;
    for (const tile of matrix) {
      if (tile[2] >= this.tileMap.width) this.tileMap.width = tile[2] + this.size.width;
      if (tile[3] >= this.tileMap.height) this.tileMap.height = tile[3] + this.size.height;
    }
    const ctx = this.tileMap.getContext('2d')!;
    for (const tile of matrix) {
      ctx.drawImage(
        this.image,
        tile[0] * this.size.width,
        tile[1] * this.size.height,
        this.size.width,
        this.size.height,
        tile[2],
        tile[3],
        this.size.width,
        this.size.height
      );
    }
  }

  setBlockMap(matrix: TileMatrix): void {
    if (!this.tileBlock || !this.blockMap) return;

    let cells: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (const tile of matrix) {
      if (this.tileBlock[tile[1]]?.[tile[0]]) {
        cells.push({
          x1: tile[2],
          y1: tile[3],
          x2: tile[2] + this.size.width,
          y2: tile[3] + this.size.height,
        });
      }
    }
    cells.sort((a, b) => a.y1 - b.y1);

    // Group by row, sort each row by x, flatten
    const rowGroups: typeof cells[] = [];
    let currentY: number | null = null;
    let currentRow: typeof cells = [];
    for (const cell of cells) {
      if (currentY === null) currentY = cell.y1;
      if (cell.y1 === currentY) {
        currentRow.push(cell);
      } else {
        currentRow.sort((a, b) => a.x1 - b.x1);
        rowGroups.push(currentRow);
        currentY = cell.y1;
        currentRow = [cell];
      }
    }
    currentRow.sort((a, b) => a.x1 - b.x1);
    rowGroups.push(currentRow);
    cells = rowGroups.flat();

    // Merge horizontally adjacent tiles in same row
    const rows: typeof cells = [];
    let temp = { ...cells[0] };
    for (let i = 1; i < cells.length; i++) {
      if (temp.x2 === cells[i].x1 && temp.y1 === cells[i].y1) {
        temp.x2 = cells[i].x2;
      } else {
        rows.push(temp);
        temp = { ...cells[i] };
      }
    }
    rows.push(temp);

    // Merge vertically adjacent rows with same x span
    rows.sort((a, b) => a.x1 - b.x1);
    const columns: typeof rows = [];
    let temp2 = { ...rows[0] };
    for (let i = 1; i < rows.length; i++) {
      if (temp2.y2 === rows[i].y1 && temp2.x1 === rows[i].x1 && temp2.x2 === rows[i].x2) {
        temp2.y2 = rows[i].y2;
      } else {
        columns.push(temp2);
        temp2 = { ...rows[i] };
      }
    }
    columns.push(temp2);

    for (const block of columns) {
      this.blockMap.push(
        new Block({ x: block.x1, y: block.y1, width: block.x2 - block.x1, height: block.y2 - block.y1 })
      );
    }
  }

  update(): void {
    this.blockMap?.forEach((block) => block.update());
  }

  render(): void {
    if (this.tileMap) {
      const scene = state.game.scene;
      (state.game.screen.buffer_context as CanvasRenderingContext2D).drawImage(
        this.tileMap,
        scene.x,
        scene.y
      );
    }
  }
}
