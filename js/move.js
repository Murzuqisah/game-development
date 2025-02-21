import { balls, bricks, gameWidth, gameHeight } from "./init.js";
export function updateGame(deltaTime) {
    for (let ball of balls) {
        let dx = ball.dx * deltaTime;
        let dy = ball.dy * deltaTime;
        ball.x += dx;
        ball.y += dy;

        // Check wall collisions
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > gameWidth) {
            ball.dx *= -1;
        }
        if (ball.y - ball.radius < 0) {
            ball.dy *= -1;
        }

        // Check bat collision
        let batCollisionTime = SweptBatCollision(ball, deltaTime);
        if (batCollisionTime !== null) {
            ball.dy *= -1; // Reverse vertical direction
        }

        // Check brick collisions using swept AABB
        for (let brick of bricks) {
            if (!brick.visible) continue;

            let collision = sweptAABB(ball, brick, deltaTime);
            if (collision) {
                // Apply collision response
                if (collision.normal.x !== 0) ball.dx *= -1;
                if (collision.normal.y !== 0) ball.dy *= -1;

                brick.visible = false; // Remove brick
                score += 10;

                // Check level completion
                if (bricks.every(b => !b.visible)) {
                    advanceLevel();
                }
            }
        }

        // Ball falls below bat (lose a life)
        if (ball.y > gameHeight) {
            lives--;
            if (lives <= 0) {
                endGame();
            } else {
                resetBall();
            }
        }
    }
}

// swept AABB collision detection logic for a moving ball & a static brick
function sweptAABB(ball, brick, dt) {
    let dx = ball.dx * dt;
    let dy = ball.dy * dt;

    let ballLeft = ball.x - ballSize;
    let ballRight = ball.x + ballSize;
    let ballTop = ball.y - ballSize;
    let ballBottom = ball.y + ballSize;

    let brickLeft = brick.x;
    let brickRight = brick.x + brickWidth;
    let brickTop = brick.y;
    let brickBottom = brick.y + brickHeight;

    let tx_entry, tx_exit, ty_entry, ty_exit;

    if (dx > 0) {
        tx_entry = (brickLeft - ballRight) / dx;
        tx_exit = (brickRight - ballLeft) / dx;
    } else if (dx < 0) {
        tx_entry = (brickRight - ballLeft) / dx;
        tx_exit = (brickLeft - ballRight) / dx;
    } else {
        tx_entry = -Infinity;
        tx_exit = Infinity;
    }

    if (dy > 0) {
        ty_entry = (brickTop - ballBottom) / dy;
        ty_exit = (brickBottom - ballTop) / dy;
    } else if (dy < 0) {
        ty_entry = (brickBottom - ballTop) / dy;
        ty_exit = (brickTop - ballBottom) / dy;
    } else {
        ty_entry = -Infinity;
        ty_exit = Infinity;
    }

    let entryTime = Math.max(tx_entry, ty_entry);
    let exitTime = Math.min(tx_exit, ty_exit);

    if (entryTime > exitTime || entryTime < 0 || entryTime > 1) {
        return null;
    }

    // Determine collision normal based on which axis had the later entry.
    let normal = { x: 0, y: 0 };
    if (tx_entry > ty_entry) {
        normal.x = dx > 0 ? -1 : 1;
    } else {
        normal.y = dy > 0 ? -1 : 1;
    }

    return { t: entryTime, normal: normal };
}

// Swept collision detection for the bat
function SweptBatCollision(ball, dt) {
    if (ball.dy <= 0) return null;
    let dy = ball.dy * dt;
    let t = (batY - (ball.y + ballSize)) / dy;
    if (t < 0 || t > 1) return null;
    let dx = ball.dx * dt;
    let ballXAtCollision = ball.x + dx * t;
    if (ballXAtCollision + ballSize < batX - batW / 2 ||
        ballXAtCollision - ballSize > batX + batW / 2) {
        return null;
    }
    return t;
}
