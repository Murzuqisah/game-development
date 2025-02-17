// Create ball
function createBall(x, y, dx, dy) {
    var ballElem = document.createElement('div');
    ballElem.className = 'ball';
    gameArea.appendChild(ballElem);
    return { x : x, y : y, dx: dx, dy : dy, elem: ballElem }
}

function removeBalls() {
    ballSize.forEach(function(ball) {
        if (ball.elem && ball.elem.parentNode) {
            ball.elem.parentNode.removeChild(ball.elem);
        }
    })
    balls = [];
}

requestAnimationFrame(gameLoop);
