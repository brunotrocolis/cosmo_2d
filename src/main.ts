module cosmo {
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
    // Teste:
    export var test: { [key: string]: any } = {
        active: false,
        update: function () {

        },
        render: function () {
            // Mostrar FPS na tela:
            game.screen.buffer_context.fillStyle = "#000000";
            game.screen.buffer_context.fillText("FPS: " + time.fps, 10, 10);
            // Mostrar limites da camera:
            game.screen.buffer_context.strokeStyle = "#FFFF00";
            game.screen.buffer_context.strokeRect(
                game.screen.camera.left,
                game.screen.camera.top,
                game.screen.size.width - (game.screen.camera.left + game.screen.camera.right),
                game.screen.size.height - (game.screen.camera.top + game.screen.camera.bottom)
            );
            // Mostrar parâmetros dos sprites:
            game.scene.actor.forEach(actor => {
                var s = actor.sprite;
                var b = game.screen.buffer_context;
                if (s !== undefined) {
                    var x = actor.x + game.scene.x;
                    var y = actor.y + game.scene.y;
                    b.beginPath()
                    b.moveTo(x - 3, y);
                    b.lineTo(x + 3, y);
                    b.moveTo(x, y - 3);
                    b.lineTo(x, y + 3);
                    b.strokeStyle = "#FF0000";
                    b.stroke();
                    b.closePath();
                    b.strokeStyle = "#0000FF";
                    b.strokeRect(
                        x - s.origin.x,
                        y - s.origin.y,
                        s.size.width,
                        s.size.height
                    );
                    if (actor.collision()) {
                        b.strokeStyle = "#FF0000";
                    } else {
                        b.strokeStyle = "#00FF00";
                    }
                    b.strokeRect(
                        (x - s.origin.x) + s.collision.rect.x,
                        (y - s.origin.y) + s.collision.rect.y,
                        s.collision.rect.width,
                        s.collision.rect.height
                    );
                }
            });
            // Mostrar áreas bloqueadas:
            game.screen.buffer_context.strokeStyle = "#FF0000";
            game.screen.buffer_context.fillStyle = "rgba(255,0,0,0.3)";
            game.scene.tiles[0].forEach(tiles => {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(block => {
                        game.screen.buffer_context.strokeRect(block.x + game.scene.x, block.y + game.scene.y, block.size.width, block.size.height);
                        game.screen.buffer_context.fillRect(block.x + game.scene.x, block.y + game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
            game.scene.tiles[1].forEach(tiles => {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(block => {
                        game.screen.buffer_context.strokeRect(block.x + game.scene.x, block.y + game.scene.y, block.size.width, block.size.height);
                        game.screen.buffer_context.fillRect(block.x + game.scene.x, block.y + game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
        }
    };
    //
    export var game: Game;
    export var time: { [key: string]: number } = {
        fps: 60,
        last: 0
    };
    export var key: Array<boolean> = [];

    export function fps(): void {
        time.fps = Math.round(1000 / (performance.now() - time.last));
        time.last = performance.now();
    }

    export function loop(last): void {
        window.requestAnimationFrame(loop);
        cosmo.game.update();
        cosmo.game.render();
        fps();
    }

    export function play(game): void {
        cosmo.game = game;
        loop(performance.now());
    }

    window.addEventListener('keydown', function (event) {
        key[event.keyCode] = true;
        //console.log(event.keyCode);
    }, false);

    window.addEventListener("keyup", function (event) {
        key[event.keyCode] = false;
    }, false);
}