import { balls, bricks, batX, batY, gameArea, gameWidth, gameHeight, ballSize, brickHeight, brickWidth, currentLevel, score, lives, fps, batElem, batWidth, batHeight, livesDisplay, levelDisplay } from "./init.js";
// import { initLevel }

// Create ball
export const createBall = (x, y, dx, dy) => {
    const ballElem = document.createElement('div');
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
    let rows, cols, xOffset, yOffset, gap;
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
            let brick = {
                x: xOffset + c * (brickWidth + gap),
                y: yOffset + r * (brickHeight + gap),
                active: true,
                changed: true,
                special: false
            };
            bricks.push(brick);
            let brickElem = document.createElement('div');
            brickElem.className = 'brick';
            brickElem.style.left = brick.x + 'px';
            brickElem.style.top = brick.y + 'px';
            brick.elem = brickElem;
            gameArea.appendChild(brickElem);
        };
    }
    if (bricks.length > 0) {
        let specialIndex = Math.floor(Math.random() * bricks.length);
        bricks[specialIndex].special = true;
        bricks[specialIndex].elem.classList.add("special");
    }
};

export const initLevel = () => {
    // remove any level overlay
    var overlay = document.getElementById("levelStep");
    if (overlay) { overlay.remove() };

    removeAllBalls();

    // ball speed increases with levels
    let speedMult = 1 + 0.5 * (currentLevel - 1);
    let initDx = 45 * speedMult;
    let initDy = -45 * speedMult;

    balls.push(createBall(gameWidth / 2, gameHeight - 100, initDx, initDy));

    createBricks();
    updateHUD();

    // set bat element position
    batElem.style.left = (batX - batWidth / 2) + 'px';
    batElem.style.top = batY + 'px';

    // update level display
    levelDisplay.textContent = "Level: " + currentLevel;
}

export const updateHUD = () => {
    scoreDisplay.textContent = "Score: " + score;
    livesDisplay.textContent = "Lives: " + lives;
    fpsDisplay.textContent = "FPS: " + fps;
}

export const draw = () =>{
    balls.forEach(function(ball) {
        ball.elem.style.left = (ball.x - ballSize) + 'px';
        ball.elem.style.top = (ball.y - ballSize) + 'px';
    });
    batElem.style.left = (batX - batWidth / 2) + 'px';
    batElem.style.top = batY + 'px';

    bricks.forEach(function(b) {
        if (b.changed) {
            b.elem.style.visibility = b.active ? 'visible' : 'hidden';
            b.changed = false;
        }
    });
}

export const updateBalls = () => {
    balls.forEach(function(ball) {
        // walls collision
        if (ball.x - ballSize + ball.dx < 0 || ball.x + ballSize + ball.dx > gameWidth) {
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
        balls = balls.filter(function (ball) {
            return ball.y - ballSize <= gameHeight;
        });

        if (balls.length === 0) {
            loseLife();
        }
    });
}



// update bat position
export function moveBat() {
    batX += batSpeed;
    if (batX < batWidth / 2) batX = batWidth / 2;
    if (batX > gameWidth - batWidth / 2) batX = gameWidth - batWidth / 2;
}

export function checkLevelCompletion() {
    let allCleared = bricks.every(function (b) { return !b.active; })
    if (allCleared) {
        cancelAnimationFrame(gameLoopID.value);
        gameState.value = "paused";
        showLevelCompletedOverlay();
    }
}

export function advanceLevel() {
    let overlay = document.getElementById("levelStep");
    if (overlay) overlay.remove();
    currentLevel++
    if (currentLevel > maxLevel) {
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
        // gameEndedOverlay();
    } else {
        cancelAnimationFrame(gameLoopID.value);
        removeAllBalls();
        setTimeout(function () {
            let speedMult = 1 + 0.5 * (currentLevel - 1);
            balls.push(createBall(gameWidth / 2, gameHeight - 100, 45 * speedMult, -45 * speedMult));
            gameLoopID.value = setInterval(gameLoop, 16);
            gameState.value = "running";
        }, 1000);
    }
}


// export { createBall, createBricks, removeAllBalls, initLevel, draw, updateBalls, moveBat, checkLevelCompletion, advanceLevel, updateHUD,  updateGame, loseLife };