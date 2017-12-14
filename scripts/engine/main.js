//--------------------------------------------------------------------------------------------------------------
//Main ---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
function gameLoop() {
    window.requestAnimationFrame(gameLoop, GameScreen.canvas);
    time.delta = performance.now() - time.last;
    if (mainLoop) mainLoop();
    GameScreen.update();
    mainScene.update();
    GameScreen.render();
    mainScene.render();
    time.last = performance.now();
    time.fps = Math.floor(1000 / time.delta);
}

function playGame() {
    if (mainStart) mainStart();
    window.requestAnimationFrame(gameLoop, GameScreen.canvas);
}