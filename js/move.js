// swept collision detection logic
function sweptAABB(ball, brick, dt) {
    let dx = ball.dx * dt;
    let dy = ball.dy * dt;

    let ballLeft = ball.x - ballSize;
    let ballRight = ball.x + ballSize;
    let ballTop = ball.y - ballSize;
    let ballBottom = ball.y + ballSize;

    let brickLeft = brick.x;
    let brickRight = brick.x + brickW;
    let brickTop = brick.y;
    let brickBottom = brick.y + brickH;

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