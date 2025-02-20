import { gameState, gameLoopID, accumulator } from "./init.js";
import { gameLoop } from "./animation.js";
import { initLevel, removeAllBalls } from "./main.js"
import { startWelcomeButton, pauseButton, endButton, resumeButton } from "./init.js"

const startGame = () => {
    if (gameState === "running") { console.log("game already running"); return };
    console.log("startGame() called")
    // Display game screen
    console.log("Starting game...");
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    initLevel();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);

    startWelcomeButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    endButton.style.display = "inline-block";
}


// pause game
const pauseGame = () => {
    if (gameState == "paused") return;
    cancelAnimationFrame(gameLoopID);
    gameState = "paused";
    pauseButton.style.display = "none";
    resumeButton.style.display = "inline-block";
}

// resume game
const resumeGame = () => {
    if (gameState != "paused") return;
    lastFPSTime = performance.now();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);
    pauseButton.style.display = "inline-block";
    resumeButton.style.display = "none";
}

const endGame = () => {
    cancelAnimationFrame(gameLoopID);
    gameState = "stopped";
    showGameOverMessage("Game Over!");
    gameEndedOverlay();
}

const All = () => {
    window.startGame = startGame;
    window.pauseGame = pauseGame;
    window.resumeGame = resumeGame;
    window.advanceLevel = advanceLevel; // not defined
    window.endGame = endGame;

};

document.addEventListener("DOMContentLoaded", function () {
    startButton.addEventListener("click", startGame);
    pauseButton.addEventListener("click", pauseGame);
    resumeButton.addEventListener("click", resumeGame);
    endButton.addEventListener("click", endGame);
});

window.onload = All;

export { startGame, pauseGame, resumeGame, endGame };