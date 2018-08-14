module cosmo {
    export class Screen {
        private main_canvas: HTMLCanvasElement;
        constructor(set: { [key: string]: any }) {
            this.main_canvas = document.createElement('canvas');
        }
    }
}