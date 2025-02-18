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



requestAnimationFrame(gameLoop);
