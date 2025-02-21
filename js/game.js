import { startButton, pauseButton, endButton, resumeButton, gameState, gameLoopID, accumulator, welcomeScreen, gameArea, gameScreen } from "./init.js"
import { gameLoop } from "./animation.js";
import { initLevel, advanceLevel } from "./main.js"

export const startGame = () => {
    if (gameState.value === "running") { console.log("game already running"); return };

    console.log("startGame() called")

    if (!welcomeScreen || !gameScreen) {
        console.error("Error: missing HTML components")
        return
    }

    console.log("switching screens...")

    welcomeScreen.style.display = "none";

    // Show game screen and force it to appear
    setTimeout(() => {
        gameScreen.style.display = "block";
        gameScreen.style.visibility = "visible"; 
        gameScreen.style.opacity = "1";
        gameScreen.style.zIndex = "10";
        console.log("Game screen should now be visible.");
    }, 50);;
    
    initLevel();
    gameState.value = "running";
    accumulator.value = 0;
    gameLoopID.value = requestAnimationFrame(gameLoop);

    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    endButton.style.display = "inline-block";
}


// pause game
export const pauseGame = () => {
    if (gameState == "paused") return;
    cancelAnimationFrame(gameLoopID.value);
    gameState.value = "paused";
    pauseButton.style.display = "none";
    resumeButton.style.display = "inline-block";
}

// resume game
export const resumeGame = () => {
    if (gameState != "paused") return;
    lastFPSTime = performance.now();
    accumulator.value = 0;
    gameState.value = "running";
    gameLoopID.value = requestAnimationFrame(gameLoop);
    pauseButton.style.display = "inline-block";
    resumeButton.style.display = "none";
}

export const endGame = () => {
    cancelAnimationFrame(gameLoopID.value);
    gameState.value = "stopped";
    showGameOverMessage("Game Over!");
    gameEndedOverlay();
}

window.onload = () => {
    window.startGame = startGame;
    window.pauseGame = pauseGame;
    window.resumeGame = resumeGame;
    window.advanceLevel = advanceLevel;
    window.endGame = endGame;

};

