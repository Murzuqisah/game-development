function startGame() {
    if (gameState === "running") { console.log("game already running"); return };
    console.log("startGame() called")
    // Display game screen
    console.log("Starting game...");
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    score = 0;
    lives = 3;
    currentLevel = 1;
    initLevel();
    lastFPSTime = performance.now();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);

    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    endButton.style.display = "inline-block";
}


// pause game
function pauseGame() {
    if (gameState == "paused") return;
    cancelAnimationFrame(gameLoopID);
    gameState = "paused";
    pauseButton.style.display = "none";
    resumeButton.style.display = "inline-block";
}

// resume game
function resumeGame() {
    if (gameState != "paused") return;
    lastFPSTime = performance.now();
    accumulator = 0;
    gameState = "running";
    gameLoopID = requestAnimationFrame(gameLoop);
    pauseButton.style.display = "inline-block";
    resumeButton.style.display = "none";
}

function endGame() {
    cancelAnimationFrame(gameLoopID);
    gameState = "stopped";
    showGameOverMessage("Game Over!");
    gameEndedOverlay();
}

function All() {
    window.startGame = startGame;
    window.pauseGame = pauseGame;
    window.resumeGame = resumeGame;
    window.advanceLevel = advanceLevel; // not defined
    window.endGame = endGame;

};

document.addEventListener("DOMContentLoaded", function() {
    startButton.addEventListener("click", startGame);
    pauseButton.addEventListener("click", pauseGame);
    resumeButton.addEventListener("click", resumeGame);
    endButton.addEventListener("click", endGame);
});

window.onload = All;