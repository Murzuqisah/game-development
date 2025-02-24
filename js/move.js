import { balls, bricks, gameWidth, gameHeight, ballSize, batY, lives, brickHeight, brickWidth } from "./init.js";
import { removeAllBalls } from "./main.js";
import { showGameOverMessage } from "./update.js";

export function updateGame(deltaTime) {
    for (var ball of balls) {
        let safeDelta = Math.min(deltaTime, 0.03);
        let dx = ball.dx * safeDelta;
        let dy = ball.dy * safeDelta;

        ball.x += dx;
        ball.y += dy;

        // Check wall collisions(left, right, top)
        if (ball.x - ballSize < 0 || ball.x + ballSize > gameWidth) {
            ball.dx = -ball.dx;
        }
        if (ball.y - ballSize < 0) { // top collision
            ball.y = ballSize;
            ball.dy = -ball.dy;
        }



        // Check bat collision
        let batCollisionTime = SweptBatCollision(ball, deltaTime);
        if (batCollisionTime !== null) {
            ball.x += batCollisionTime * dx; // Move ball to the bat collision point
            ball.y = batY - ballSize;
            ball.dy = -Math.abs(ball.dy); // Ensure bounce always goes upward
        }

        // Check brick collisions using swept AABB
        for (let brick of bricks) {
            if (!brick.visible) continue;

            let collision = sweptAABB(ball, brick, deltaTime);
            if (collision) {
                // Move the ball to the exact collision point
                ball.x += collision.t * dx;
                ball.y += collision.t * dy;

                // Reverse the direction of movement
                if (collision.normal.x !== 0) ball.dx *= -1;
                if (collision.normal.y !== 0) ball.dy *= -1;

                // Remove brick properly
                brick.visible = false;
                brick.elem.style.visibility = "hidden";

                score += 10;

                // Check level completion
                if (bricks.every(b => !b.visible)) {
                    advanceLevel();
                }
                break; // Ensure only ONE brick is hit per frame
            }
        }

        // Ball falls below bat (lose a life)
        if (ball.y > gameHeight) {
            lives--;
            if (lives <= 0) {
                showGameOverMessage();
            } else {
                removeAllBalls();
                // console.log("Ball is still in play:", ball.x, ball.y);
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
        return null; // No valid collision
    }

    let normal = { x: 0, y: 0 };
    if (tx_entry > ty_entry) {
        normal.x = dx > 0 ? -1 : 1;  // Ball hit left or right
    } else {
        normal.y = dy > 0 ? -1 : 1;  // Ball hit top or bottom
    }

    return { t: entryTime, normal: normal };
}

// Swept collision detection for the bat
function SweptBatCollision(ball, dt) {
    if (ball.dy <= 0) return null; // Ball must be moving downward

    let ballBottomNext = ball.y + ball.dy * dt + ballSize;
    let batTop = batY;

    if (ballBottomNext >= batTop &&
        ball.x + ballSize > batX - batWidth / 2 &&
        ball.x - ballSize < batX + batWidth / 2) {

        // Calculate when the ball will hit the bat
        let t = (batTop - (ball.y + ballSize)) / ball.dy;
        return Math.max(0, Math.min(1, t)); // Clamp t between 0 and 1
    }
    return null;
}