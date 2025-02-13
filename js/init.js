
const gameArea = document.getElementById('gameArea');
const ballElem = document.getElementById('ball');
const batElem = document.getElementById('bat');
const scoreElem = document.getElementById('score');
const messageElem = document.getElementById('message');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const stopButton = document.getElementById('stopButton');


// game area dimensions
const gameWidth = 600;
const gameHeight = 400;
gameArea.style.width = gameWidth + 'px';
gameArea.style.height = gameHeight + 'px';

// element sizes
const ballSize = 80;
const batWidth = 80;
const batHeight = 10;
const brickWidth = 80;
const brickHeight = 20;

// game variables
let ballX = gameWidth / 2 - ballSize / 2;
let ballY = gameHeight - 50 - ballSize;
let dx = 2, dy = -2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// array to hold bricks objects (x and y -> top left corner of the brick, active -> brick status)
let brick = [x, y, active];
let batX = gameWidth / 2 - batWidth / 2;
let batY = gameHeight - 50 - batHeight;
let batSpeed = 20;

let score = 0;
let level = 1;
const levelStep = 5;
let gameRunning = false;
let gamePaused = false;
