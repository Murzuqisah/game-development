// Main entry point of the game
// This file is responsible for setting up the game and starting the game loop

// Import the game class
import Game from './game.js';

function gameLoop() {
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
}

// Create a new game object

function updateGame() {
    game.update();
}

requestAnimationFrame(gameLoop);
