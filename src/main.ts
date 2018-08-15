module cosmo {

    export var game: Game; 
    export var time: { [key: string]: number } = {
        fps: 60,
        delta: 0,
        last: 0
    };
    export var key: Array<boolean> = [];

    export const QQVGA: Array<number> = [160, 120];
    export const HQVGA: Array<number> = [240, 160];
    export const QVGA: Array<number> = [320, 240];
    export const WQVGA: Array<number> = [400, 240];
    export const HVGA: Array<number> = [480, 320];
    export const nHD: Array<number> = [640, 360];
    export const VGA: Array<number> = [640, 480];
    export const WVGA: Array<number> = [800, 480];
    export const FWVGA: Array<number> = [854, 480];
    export const qHD: Array<number> = [960, 540];
    export const DVGA: Array<number> = [960, 640];
    export const SVGA: Array<number> = [800, 600];
    export const WSVGA: Array<number> = [1024, 600];
    export const XGA: Array<number> = [1024, 768];
    export const WXGA: Array<number> = [1280, 720];
    export const HD: Array<number> = [1280, 720];
    export const SXGA: Array<number> = [1280, 1024];
    export const SXGA_P: Array<number> = [1400, 1050];
    export const WXGA_P: Array<number> = [1440, 900];
    export const UXGA: Array<number> = [1600, 1200];
    export const UXGA_PP: Array<number> = [1680, 1050];
    export const WUXGA: Array<number> = [1920, 1200];
    export const FHD: Array<number> = [1920, 1080];
    export const FULL_HD: Array<number> = [1920, 1080];
    export const QWXGA: Array<number> = [2048, 1152];
    export const QXGA: Array<number> = [2048, 1536];
    export const WQHD: Array<number> = [2560, 1440];
    export const WQXGA: Array<number> = [2560, 1600];
    export const LANDSCAPE: boolean = false;
    export const PORTRAIT: boolean = true;

    export var resource = function (id: string): HTMLElement {
        return document.getElementById(id);
    }
    export var res = resource;

    export function loop(): void {
        window.requestAnimationFrame(loop);
        cosmo.game.loop();

        cosmo.game.screen.render();
    }
    export function start(): void {

    }
    export function play(game): void {
        cosmo.game = game;
        start();
        loop();
    }

    window.addEventListener('keydown', function (event) {
        key[event.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function (event) {
        key[event.keyCode] = false;
    }, false);
}