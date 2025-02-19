export const gameScreen = document.getElementById('gameScreen');
export const gameArea = document.getElementById('gameArea');
export const batElem = document.getElementById('bat');
export const scoreDisplay = document.getElementById('scoreDisplay');
export const startButton = document.getElementById('startWelcomeButton');
export const pauseButton = document.getElementById('pauseButton');
export const resumeButton = document.getElementById('resumeButton');
export const endButton = document.getElementById('endButton');
export const levelDisplay = document.getElementById('levelStep');
export const livesDisplay = document.getElementById('livesDisplay');
export const fpsDisplay = document.getElementById('fpsDisplay');


// game area dimensions
export const gameWidth = 750, gameHeight = 700;
gameArea.style.width = gameWidth + 'px';
gameArea.style.height = gameHeight + 'px';

// element sizes
export const ballSize = 80,
    batWidth = 80,
    batHeight = 10,
    brickWidth = 80,
    brickHeight = 20;

// // game variables
// var ballX = gameWidth / 2 - ballSize / 2,
//     ballY = gameHeight - 50 - ballSize,
//     dx = 2, dy = -2,
//     ballSpeedX = 45,
//     ballSpeedY = -45;

// array to hold bricks objects (x and y -> top left corner of the brick, active -> brick status)
export let bricks = [],
    balls = [],
    batX = gameWidth / 2 - batWidth / 2,
    batY = gameHeight - 50 - batHeight,
    batSpeed = 20;

export let score = 0,
    currentLevel = 1,
    lives = 3,
    levelStep = 5,
    gameState = "stopped";

export let lastFPSTime = performance.now(),
    frameCount = 0,
    fps = 0;

// Game control variables
export let gameLoopID = null, accumulator = 0;
