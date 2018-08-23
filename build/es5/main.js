var cosmo;
(function (cosmo) {
    cosmo.QQVGA = [160, 120];
    cosmo.HQVGA = [240, 160];
    cosmo.QVGA = [320, 240];
    cosmo.WQVGA = [400, 240];
    cosmo.HVGA = [480, 320];
    cosmo.nHD = [640, 360];
    cosmo.VGA = [640, 480];
    cosmo.WVGA = [800, 480];
    cosmo.FWVGA = [854, 480];
    cosmo.qHD = [960, 540];
    cosmo.DVGA = [960, 640];
    cosmo.SVGA = [800, 600];
    cosmo.WSVGA = [1024, 600];
    cosmo.XGA = [1024, 768];
    cosmo.WXGA = [1280, 720];
    cosmo.HD = [1280, 720];
    cosmo.SXGA = [1280, 1024];
    cosmo.SXGA_P = [1400, 1050];
    cosmo.WXGA_P = [1440, 900];
    cosmo.UXGA = [1600, 1200];
    cosmo.UXGA_PP = [1680, 1050];
    cosmo.WUXGA = [1920, 1200];
    cosmo.FHD = [1920, 1080];
    cosmo.FULL_HD = [1920, 1080];
    cosmo.QWXGA = [2048, 1152];
    cosmo.QXGA = [2048, 1536];
    cosmo.WQHD = [2560, 1440];
    cosmo.WQXGA = [2560, 1600];
    cosmo.LANDSCAPE = false;
    cosmo.PORTRAIT = true;
    // Teste:
    cosmo.test = {
        active: false,
        update: function () {
        },
        render: function () {
            // Mostrar FPS na tela:
            cosmo.game.screen.buffer_context.fillStyle = "#000000";
            cosmo.game.screen.buffer_context.fillText("FPS: " + cosmo.time.fps, 10, 10);
            // Mostrar limites da camera:
            cosmo.game.screen.buffer_context.strokeStyle = "#FFFF00";
            cosmo.game.screen.buffer_context.strokeRect(cosmo.game.screen.camera.left, cosmo.game.screen.camera.top, cosmo.game.screen.size.width - (cosmo.game.screen.camera.left + cosmo.game.screen.camera.right), cosmo.game.screen.size.height - (cosmo.game.screen.camera.top + cosmo.game.screen.camera.bottom));
            // Mostrar parâmetros dos sprites:
            cosmo.game.scene.actor.forEach(function (actor) {
                var s = actor.sprite;
                var b = cosmo.game.screen.buffer_context;
                if (s !== undefined) {
                    var x = actor.x + cosmo.game.scene.x;
                    var y = actor.y + cosmo.game.scene.y;
                    b.beginPath();
                    b.moveTo(x - 3, y);
                    b.lineTo(x + 3, y);
                    b.moveTo(x, y - 3);
                    b.lineTo(x, y + 3);
                    b.strokeStyle = "#FF0000";
                    b.stroke();
                    b.closePath();
                    b.strokeStyle = "#0000FF";
                    b.strokeRect(x - s.origin.x, y - s.origin.y, s.size.width, s.size.height);
                    if (actor.collision()) {
                        b.strokeStyle = "#FF0000";
                    }
                    else {
                        b.strokeStyle = "#00FF00";
                    }
                    b.strokeRect((x - s.origin.x) + s.collision.rect.x, (y - s.origin.y) + s.collision.rect.y, s.collision.rect.width, s.collision.rect.height);
                }
            });
            // Mostrar áreas bloqueadas:
            cosmo.game.screen.buffer_context.strokeStyle = "#FF0000";
            cosmo.game.screen.buffer_context.fillStyle = "rgba(255,0,0,0.3)";
            cosmo.game.scene.tiles[0].forEach(function (tiles) {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(function (block) {
                        cosmo.game.screen.buffer_context.strokeRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                        cosmo.game.screen.buffer_context.fillRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
            cosmo.game.scene.tiles[1].forEach(function (tiles) {
                if (tiles.blockMap) {
                    tiles.blockMap.forEach(function (block) {
                        cosmo.game.screen.buffer_context.strokeRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                        cosmo.game.screen.buffer_context.fillRect(block.x + cosmo.game.scene.x, block.y + cosmo.game.scene.y, block.size.width, block.size.height);
                    });
                }
            });
        }
    };
    cosmo.time = {
        fps: 60,
        last: 0
    };
    cosmo.key = [];
    function fps() {
        cosmo.time.fps = Math.round(1000 / (performance.now() - cosmo.time.last));
        cosmo.time.last = performance.now();
    }
    cosmo.fps = fps;
    function loop(last) {
        window.requestAnimationFrame(loop);
        cosmo.game.update();
        cosmo.game.render();
        fps();
    }
    cosmo.loop = loop;
    function play(game) {
        cosmo.game = game;
        loop(performance.now());
    }
    cosmo.play = play;
    window.addEventListener('keydown', function (event) {
        cosmo.key[event.keyCode] = true;
        //console.log(event.keyCode);
    }, false);
    window.addEventListener("keyup", function (event) {
        cosmo.key[event.keyCode] = false;
    }, false);
})(cosmo || (cosmo = {}));
