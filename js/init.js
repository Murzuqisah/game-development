export const gameScreen = document.getElementById('gameScreen');
export const welcomeScreen = document.getElementById('welcomeScreen');
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
export const gameWidth = 400, gameHeight = 700;
gameArea.style.width = gameWidth + 'px';
gameArea.style.height = gameHeight + 'px';

// element sizes
export const ballSize = 80,
    batWidth = 80,
    batHeight = 20,
    brickWidth = 40,
    brickHeight = 20;

// array to hold bricks objects (x and y -> top left corner of the brick, active -> brick status)
export let bricks = [],
    balls = [],
    batX = { value: gameWidth / 2 },
    batY = { value: gameHeight - 50},
    batSpeed = 20;

export let score = 0,
    currentLevel = 1,
    lives = 3,
    levelStep = 5;
    
export let lastFPSTime = { value: performance.now()};

// Game control variables
export let fps = { value: 0}
export let frameCount = { value: 0};
export let gameLoopID = { value: null};
export let accumulator = { value: 0 };
export let gameState = { value: "stopped" };