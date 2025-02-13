const FPS = 60;
const TIME_STEP = 1 / FPS;
let previousTime = performance.now();
let accumulator = 0;

function gameLoop(currentTime) {
    let frameTime = (currentTime - previousTime) / 1000;

    frameTime = Math.min(frameTime, 0.1);
    previousTime = currentTime;
    accumulator += frameTime;

    while (accumulator >= TIME_STEP) {
        updateGame(TIME_STEP);
        accumulator -= TIME_STEP;
    }

    renderGame();
    requestAnimationFrame(gameLoop);
};