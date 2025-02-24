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
        if (batCollisionTime) {
            ball.y = batY - ballSize; // Ensure ball is on top of bat
            ball.dy = -Math.abs(ball.dy); // Always bounce upwards
        }

        // Check brick collisions using swept AABB
        for (let brick of bricks) {
            if (!brick.visible) continue;

            let collision = sweptAABB(ball, brick, deltaTime);
            if (collision) {
                ball.x += collision.t * dx;
                ball.y += collision.t * dy;

                // Apply collision response
                if (collision.normal.x !== 0) ball.dx = Math.sign(ball.dx) * Math.abs(ball.dx);
                if (collision.normal.y !== 0) ball.dy = -Math.abs(ball.dy); // Always bounce upwards

                setTimeout(() => brick.elem.remove(), 50); // Delay removal slightly
                brick.changed = true;
                brick.elem.style.visibility = "hidden"; // Update DOM
                score += 10;

                // Check level completion
                if (bricks.every(b => !b.visible)) {
                    advanceLevel();
                }
            }
            console.log("Ball:", ball.x, ball.y, "Brick:", brick.x, brick.y, "Collision:", collision);
        }

        // Ball falls below bat (lose a life)
        if (ball.y > gameHeight) {
            lives--;
            if (lives <= 0) {
                showGameOverMessage();
            } else {
                // removeAllBalls();
                console.log("Ball is still in play:", ball.x, ball.y);
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
    let brickTop = brick.y;
    let brickRight = brick.x + brick.width;
    let brickBottom = brick.y + brick.height;

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

    if (entryTime > exitTime || entryTime < 0 || entryTime > 1.1) {
        return null;
    }

    // Determine collision normal based on which axis had the later entry.
    let normal = { x: 0, y: 0 };
    if (tx_entry > ty_entry) {
        normal = { x: Math.sign(dx), y: 0 };  // Flip X direction
    } else {
        normal = { x: 0, y: Math.sign(dy) };  // Flip Y direction
    }

    return { t: entryTime, normal: normal };
}

// Swept collision detection for the bat
function SweptBatCollision(ball, dt) {
    if (ball.dy <= 0) return null; // Ball must be moving downward

    let nextBallY = ball.y + ball.dy * dt;

    if (
        nextBallY + ballSize >= batY &&  // Ball reaches bat level
        ball.x + ballSize > batX - batWidth / 2 &&  // Ball within bat width
        ball.x - ballSize < batX + batWidth / 2
    ) {
        return true;
    }
    return null;
}