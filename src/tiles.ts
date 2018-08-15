module cosmo {
    export interface IF_Tiles {
        image: HTMLImageElement;
        size: { [key: string]: number };
    }
    export class Tiles implements IF_Tiles {
        public image: HTMLImageElement;
        public size: { [key: string]: number };
        constructor(set?: { [key: string]: any }) {
            var set: { [key: string]: any } = set || {};
            this.image = new HTMLImageElement();
            this.image.src = set.image;
            this.size = {};
            this.size.rows = set.rows || 1;
            this.size.columns = set.columns || 1;
            this.size.width = Math.round(this.image.width / this.size.columns) || this.image.width;
            this.size.height = Math.round(this.image.height / this.size.rows) || this.image.height;

        }
    }
}