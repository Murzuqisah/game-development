import { balls, bricks, batX, batY, gameArea, gameWidth, gameHeight, ballSize, brickHeight, brickWidth, currentLevel, score, lives, fps, batElem, batWidth, batHeight, livesDisplay, levelDisplay, levelStep, batSpeed } from "./init.js";

let ballLaunched = false;
// Create ball
export const createBall = (x, y, dx, dy) => {
    var ballElem = document.createElement('div');
    ballElem.className = 'ball';
    gameArea.appendChild(ballElem);
    return { x: x, y: y, dx: dx, dy: dy, elem: ballElem };
}

export const removeAllBalls = () => {
    balls.forEach(ball => ball.elem.remove());
    balls.length = 0;
}

export const createBricks = () => {
    bricks.splice(0, bricks.length);
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
        rows = 6; cols = 12; xOffset = 20; yOffset = 30; gap = 2;
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
            brickElem.style.top = brick.y + 'px';
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

export const initLevel = () => {
    // remove any level overlay
    var overlay = document.getElementById("levelStep");
    if (overlay) { overlay.remove() };

    batX.value = (gameWidth - batWidth) / 2;
    batY.value = gameHeight - batHeight;
    removeAllBalls();

    // ball speed increases with levels
    var speedMult = 1 + 0.5 * (currentLevel - 1);
    var initDx = 50 * speedMult;
    var initDy = -50 * speedMult;

    // ball starts on top of the bat
    balls.push(createBall(batX.value, batY.value - ballSize, 0, 0));
    createBricks();
    updateHUD();

    // set bat element position
    batElem.style.left = (batX.value - batWidth / 2) + 'px';
    batElem.style.top = batY.value + 'px';

    // update level display
    levelDisplay.textContent = "Level: " + currentLevel;
}

export const updateHUD = () => {
    scoreDisplay.textContent = "Score: " + score;
    livesDisplay.textContent = "Lives: " + lives;
    fpsDisplay.textContent = "FPS: " + fps.value;
}

export const draw = () => {
    balls.forEach(function (ball) {
        ball.elem.style.left = (ball.x - ballSize) + 'px';
        ball.elem.style.top = (ball.y - ballSize) + 'px';
    });
    batElem.style.left = (batX.value - batWidth / 2) + 'px';
    batElem.style.top = batY.value + 'px';

    bricks.forEach(function (b) {
        if (b.changed) {
            b.elem.style.visibility = b.active ? 'visible' : 'hidden';
            b.changed = false;
        }
    });
}

export const updateBalls = () => {
    balls.forEach(function (ball) {
        if (!ballLaunched) {
            ball.x = batX.value;
            ball.y = batY.value - ballSize;
        } else {
            ball.x += ball.dx;
            ball.y += ball.dy;
        }
        // walls collision(left/right)
        var collisonHandled = false;

        if (ball.x - ballSize < 0 || ball.x + ballSize > gameWidth) {
            ball.dx *= -1;

            if (ball.x - ballSize < 0) ball.x = ballSize;
            if (ball.x + ballSize > gameWidth) ball.x = gameWidth - ballSize;
        }

        // top collision
        if (ball.dy - ballSize < 0) {
            ball.y = ballSize;
            ball.dy = -ball.dy;
        }

        // bat collision
        if (ball.dy > 0 &&
            ball.y + ballSize >= batY &&
            ball.x + ballSize > batX.value - batWidth / 2 &&
            ball.x - ballSize < batX.value + batWidth / 2) {
            ball.y = batY - ballSize;
            ball.dy *= -1;

            // Adjust horizontal movement based on where the ball hits the bat
            let batCenter = batX.value;
            let hitPosition = (ball.x - batCenter) / (batWidth / 2);
            ball.dx = hitPosition * Math.abs(ball.dx);
        }

        // update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (!collisonHandled) {
            // brick collision
            for (var i = 0; i < bricks.length; i++) {
                var b = bricks[i];
                if (!b.active) continue;
                if (b.x < ball.x + ballSize &&
                    ball.x - ballSize < b.x + brickWidth &&
                    b.y < ball.y + ballSize &&
                    ball.y - ballSize < b.y + brickHeight) {
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

        ballElem.style.left = ball.x + 'px';
        ballElem.style.top = ball.y + 'px';
    });

    balls = balls.filter(function (ball) {
        return ball.y - ballSize <= gameHeight;
    });

    if (balls.length === 0) {
        loseLife();
    }
}



// update bat position
export function moveBat() {
    batX.value += batSpeed;

    // Ensure batX represents the LEFT edge of the bat
    if (batX.value < 0) batX.value = 0;
    if (batX.value > gameWidth - batWidth) batX.value = gameWidth - batWidth;

    batElem.style.left = (batX.value - batWidth / 2) + 'px';

    // If ball is not launched, move it with the bat
    if (!ballLaunched && balls.length > 0) {
        balls[0].x = batX.value + batWidth / 2 - ballSize / 2;
    }
}

export function checkLevelCompletion() {
    var allCleared = bricks.every(function (b) { return !b.active; })
    if (allCleared) {
        cancelAnimationFrame(gameLoopID.value);
        gameState.value = "paused";
        showLevelCompletedOverlay();
    }
}

export function advanceLevel() {
    var overlay = document.getElementById("levelStep");
    if (overlay) { overlay.remove() };
    currentLevel++
    if (currentLevel > levelStep) {
        showGameOverMessage("Congratulations! You completed all levels!");
        gameState.value = "stopped";
        return;
    }
    initLevel();
    gameLoopID.value = setInterval(gameLoop, 16);
    gameState.value = "running";
}

export function loseLife() {
    lives--;
    updateHUD();
    if (lives <= 0) {
        endGame();
        gameState.value = "stopped"
        gameEndedOverlay();
    } else {
        cancelAnimationFrame(gameLoopID.value);
        removeAllBalls();
        setTimeout(function () {
            var speedMult = 1 + 0.5 * (currentLevel - 1);
            balls.push(createBall(gameWidth / 2, gameHeight - 100, 45 * speedMult, -45 * speedMult));
            gameLoopID.value = setInterval(gameLoop, 16);
            gameState.value = "running";
        }, 1000);
    }
}