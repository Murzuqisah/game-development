// game area dimensions
var gameWidth = 750,
    gameHeight = 700;
gameArea.style.width = gameWidth + 'px';
gameArea.style.height = gameHeight + 'px';

// element sizes
var ballSize = 80,
    batWidth = 80,
    batHeight = 10,
    brickWidth = 80,
    brickHeight = 20;

// game variables
var ballX = gameWidth / 2 - ballSize / 2,
    ballY = gameHeight - 50 - ballSize,
    dx = 2, dy = -2,
    ballSpeedX = 5,
    ballSpeedY = 5;

// array to hold bricks objects (x and y -> top left corner of the brick, active -> brick status)
var brick = [x, y, active],
    batX = gameWidth / 2 - batWidth / 2,
    batY = gameHeight - 50 - batHeight,
    batSpeed = 20;

var score = 0,
    level = 1,
    levelStep = 5,
    gameRunning = false,
    gamePaused = false;

var lastFPSTime = performance.now(),
    frameCount = 0,
    fps = 0;

const gameArea = document.getElementById('gameArea');
const ballElem = document.getElementById('ball');
const batElem = document.getElementById('bat');
const scoreElem = document.getElementById('score');
const messageElem = document.getElementById('message');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const stopButton = document.getElementById('stopButton');
const levelDisplay = document.getElementById('levelStep');


// Game control variables
var gameState = "stopped",
    gameLoopID = null;