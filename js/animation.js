import { gameState, gameLoopID, accumulator, lastFPSTime, fps, frameCount } from "./init.js";
import { updateGame } from "./move.js"
import { draw, updateHUD } from "./main.js"

const TIME_STEP_MS = 1000 / 60;
const TIME_STEP_S = 1 / 60;

let previousTime = performance.now();

export const gameLoop = (currentTime) => {
    if (gameState !== 'running') return;

    let frameTime = currentTime - previousTime;
    previousTime = currentTime;
    frameTime = Math.min(frameTime, 100);
    accumulator += frameTime;

    while (accumulator >= TIME_STEP_MS) {
        updateGame(TIME_STEP_S);
        accumulator -= TIME_STEP_MS;
    }

    draw();
    frameCount++;
    let now = performance.now();
    if (now - lastFPSTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFPSTime = now;
        updateHUD();
    }

    // Request the next frame.
    gameLoopID = requestAnimationFrame(gameLoop);
};

// export { gameLoop };