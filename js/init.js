// document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById('gameArea');
    var batElem = document.getElementById('bat');
    var scoreElem = document.getElementById('scoreDisplay');
    let startButton = document.getElementById('startWelcomeButton');
    let pauseButton = document.getElementById('pauseButton');
    let resumeButton = document.getElementById('resumeButton');
    let stopButton = document.getElementById('endButton');
    let levelDisplay = document.getElementById('levelStep');
    let livesDisplay = document.getElementById('livesDisplay');
    let fpsDisplay = document.getElementById('fpsDisplay');


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
        ballSpeedX = 45,
        ballSpeedY = -45;

    // array to hold bricks objects (x and y -> top left corner of the brick, active -> brick status)
    var bricks = [],
        balls = [],
        batX = gameWidth / 2 - batWidth / 2,
        batY = gameHeight - 50 - batHeight,
        batSpeed = 20;

    let score = 0,
        currentLevel = 1,
        lives = 3,
        levelStep = 5,
        gameState = "stopped";

    var lastFPSTime,
        frameCount = 0,
        fps = 0;



    // Game control variables
    var gameLoopID = null;
// });