//--------------------------------------------------------------------------------------------------------------
//Main ---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function gameLoop() {
    window.requestAnimationFrame(gameLoop, gameScreen.canvas);
    time.delta = performance.now() - time.last;
    if (mainLoop) mainLoop();
    gameScreen.update();
    mainScene.update();
    gameScreen.render();
    mainScene.render();
    time.last = performance.now();
    time.fps = Math.floor(1000 / time.delta);
}

function playGame() {
    if (mainStart) mainStart();
    window.requestAnimationFrame(gameLoop, gameScreen.canvas);
}