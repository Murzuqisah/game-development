function startGame() {
    if (gameState === "running") return;

    // Display game screen
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    score = 0;
    lives = 3;
    currentLevel = 1;
    initLevel();
    lastTime = performance.now();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);
}

window.startGame = startGame;
window.pauseGame = pauseGame;
window.resumeGame = resumeGame;
window.advanceLevel = advanceLevel;
window.endGame = endGame;

// pause game
function pauseGame() {
    if (gameState == "paused") return;
    cancelAnimationFrame(gameLoopID);
    gameState = "paused";
    pauseButton.style.display = "inline-block";
    resumeButton.style.display = "none";
}

// resume game
function resumeGame() {
    if (gameState != "paused") return;
    lastTime = performance.now();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);
    pauseButton.style.display = "inline-block";
    resumeButton.style.display = "none";
}

function endGame() {
    cancelAnimationFrame(gameLoopID);
    gameState = "stopped";
    showGameOvermessage();
}
