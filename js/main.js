// Create ball
function createBall(x, y, dx, dy) {
    var ballElem = document.createElement('div');
    ballElem.className = 'ball';
    gameArea.appendChild(ballElem);
    return { x: x, y: y, dx: dx, dy: dy, elem: ballElem }
}

function removeAllBalls() {
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

function updateBalls() {
    balls.forEach(function (ball) {
        var collisonHandled = false;
        // walls collision
        if (balls.x - ballSize + ball.dx < 0 || balls.x + ballSize + ball.dx > w) {
            ball.dx = -ball.dx;
        }

        // top collision
        if (ball.y - ballSize + ball.dy < 0) {
            ball.dy = -ball.dy;
        }

        // bat collision
        if (ball.dy > 0 &&
            ball.y + ballSize >= batY &&
            ball.y + ballSize - ball.dy < batY &&
            ball.x + ballSize > batX - batWidth / 2 &&
            ball.x - ballSize < batX + batWidth / 2) {
            ball.y = batY - ballSize;
            ball.dy = -ball.dy;
            collisonHandled = true;
        }

        // update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        // brick collision
        if (!collisonHandled) {
            for (var i = 0; i < bricks.length; i++) {
                var b = bricks[i];
                if (!b.active) continue;
                if (b.x < ball.x + ballSize &&
                    ball.x - ballSize < b.x + brickWidth &&
                    b.y < ball.y + ballSize &&
                    ball.y - ballSize < b.y + brickHeight
                ) {
                    b.active = false;
                    b.changed = true;
                    ball.dy = -ball.dy;
                    score += 10;
                    updateHUD();
                    // for special brick, spawn a bonus ball
                    if (b.special) {
                        balls.push(createBall(b.x + brickWidth / 2, b.y + brickHeight / 2, ball.dx, ball.dy));
                    }
                    break;
                }
            }
        }
    });

    balls = balls.filter(function (ball) {
        return ball.y - ballSize <= gameHeight;
    });

    if (balls.length === 0) {
        loseLife();
    }
}


// update bat position
function moveBat() {
    batX += currentBatSpeed;
    if (batX < batWidth / 2) batX = batWidth / 2;
    if (batX > w - batWidth / 2) batX = w - batWidth / 2;
}

function checkLevelCompletion() {
    var allCleared = bricks.every(function (b) { return !b.active; })
    if (allCleared) {
        clearInterval(gameLoopTimer);
        gameState = "paused";
        showLevelCompletedOverlay();
    }
}

function advanceLevel() {
    var overlay = document.getElementById("levelStep");
    if (overlay) overlay.remove();
    currentLevel++
    if (currentLevel > maxLevel) {
        showGameOverMessage("Congratulations! You completed all levels!");
        gameState = "stopped";
        return;
    }
    initLevel();
    gameLoopTimer = setInterval(gameLoop, 16);
    gameState = "running";
}

function loseLife() {
    lives--;
    updateHUD();
    if (lives <= 0) {
        endGame();
    } else {
        clearInterval(gameLoopTimer);
        removeAllBalls();
        setTimeout(function () {
            var speedMult = 1 + 0.5 * (currentLevel - 1);
            balls.push(createBall(gameWidth / 2, gameHeight - 100, 45 * speedMult, -45 * speedMult));
            gameLoopTimer = setInterval(gameLoop, 16);
            gameState = "running";
        }, 1000);
    }
}

requestAnimationFrame(gameLoop);
