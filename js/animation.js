import { gameState, gameLoopID, accumulator, lastFPSTime, fps, frameCount } from "./init.js";
import { updateGame } from "./move.js"
import { draw, updateHUD, updateBalls, moveBat, checkLevelCompletion } from "./main.js"

const TIME_STEP_MS = 1000 / 60;
const TIME_STEP_S = 1 / 60;

let previousTime = performance.now();

export const gameLoop = (currentTime) => {

    if (gameState.value !== 'running') return;

    let frameTime = currentTime - previousTime;
    previousTime = currentTime;
    frameTime = Math.min(frameTime, 100);
    accumulator.value += frameTime;

    while (accumulator.value >= TIME_STEP_MS) {
        updateGame(TIME_STEP_S);
        accumulator.value -= TIME_STEP_MS;
    }

    draw();
    frameCount.value++;
    let now = performance.now();
    if (now - lastFPSTime >= 1000) {
        fps.value = frameCount.value;
        frameCount.value = 0;
        lastFPSTime.value = now;
        updateHUD();
    }

    // Request the next frame.
    gameLoopID.value = requestAnimationFrame(gameLoop);
};