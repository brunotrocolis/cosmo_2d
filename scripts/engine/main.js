//--------------------------------------------------------------------------------------------------------------
//Main ---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
cosmo.gameLoop = function () {
    window.requestAnimationFrame(cosmo.gameLoop, cosmo.gameScreen.canvas);
    cosmo.time.delta = performance.now() - cosmo.time.last;
    if (cosmo.loop) cosmo.loop();
    cosmo.gameScreen.update();
    cosmo.mainScene.update();
    cosmo.gameScreen.render();
    cosmo.mainScene.render();
    cosmo.time.last = performance.now();
    cosmo.time.fps = Math.floor(1000 / cosmo.time.delta);
}

function playGame() {
    if (cosmo.start) cosmo.start();
    window.requestAnimationFrame(cosmo.loop, cosmo.gameScreen.canvas);
}