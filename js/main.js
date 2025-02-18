// Create ball
function createBall(x, y, dx, dy) {
    var ballElem = document.createElement('div');
    ballElem.className = 'ball';
    gameArea.appendChild(ballElem);
    return { x: x, y: y, dx: dx, dy: dy, elem: ballElem }
}

function removeBalls() {
    ballSize.forEach(function (ball) {
        if (ball.elem && ball.elem.parentNode) {
            ball.elem.parentNode.removeChild(ball.elem);
        }
    })
    balls = [];
}

function createBricks() {
    bricks = [];

    document.querySelectorAll('.brick').forEach(br => br.remove());

    // define level-based parameters
    var rows, cols, xOffset, yOffset, gap;
    if (currentLevel === 1) {
        rows = 4; cols = 10; xOffset = 50; yOffset = 50; gap = 0;
    } else if (currentLevel === 2) {
        rows = 5; cols = 10; xOffset = 40; yOffset = 40; gap = 1;
    } else if (currentLevel === 3) {
        rows = 6; cols = 10; xOffset = 30; yOffset = 35; gap = 2;
    } else if (currentLevel === 4) {
        rows = 6; cols = 12; xOffset = 30; yOffset = 30; gap = 2;
    } else if (currentLevel === 5) {
        rows = 7; cols = 12; xOffset = 10; yOffset = 25; gap = 2;
    }

    // creating grid-like brick layout
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var brick = {
                x: xOffset + c * (brickWidth + gap),
                y: yOffset + r * (brickHeight + gap),
                active: true,
                changed: true,
                special: false
            };
            bricks.push(brick);
            var brickElem = document.createElement('div');
            brickElem.className = 'brick';
            brickElem.style.left = brick.x + 'px';
            brick.style.right = brick.y + 'px';
            brick.elem = brickElem;
            gameArea.appendChild(brickElem);
        };
    }
    if (bricks.length > 0) {
        var specialIndex = Math.floor(Math.random() * bricks.length);
        bricks[specialIndex].special = true;
        bricks[specialIndex].elem.classList.add("special");
    }
};

function initLevel() {
    // remove any level overlay
    var overlay = document.getElementById("levelStep");
    if (overlay) overlay.remove();

    // batX = w / 2;
    // batY = h - 50
    removeBalls();

    // ball speed increases with levels
    var speedMult = 1 + 0.5 * (currentLevel - 1);
    var initDx = 45 * speedMult;
    var initDy = -45 * speedMult;

    balls.push(createBall(w / 2, h - 100, initDx, initDy));

    createBricks();
    updateHUD();

    // set bat element position
    batElem.style.left = (batX - batWidth / 2) + 'px';
    batElem.style.top = batY + 'px';

    // update level display
    levelDisplay.textContent = "Level: " + currentLevel;
}

function updateHUD() {
    scoreDisplay.textContent = "Score: " + score;
    livesDisplay.textContent = "Lives: " + lives;
    fpsDisplay.textContent = "FPS: " + fps;
}

function draw() {
    balls.forEach(function (ball) {
        ball.elem.style.left = (ball.x - ballSize) + 'px';
        ball.elem.style.top = (ball.y - ballSize) + 'px';
    });
    batElem.style.left = (batX - batWidth / 2) + 'px';
    batElem.style.top = batY + 'px';

    bricks.forEach(function (b) {
        if (b.changed) {
            b.elem.visibility = b.active ? 'visible' : 'hidden';
            b.changed = false;
        }
    });
}



requestAnimationFrame(gameLoop);
