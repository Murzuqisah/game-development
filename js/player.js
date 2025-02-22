document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            bat.moveLeft(); // Move the bat left
            break;
        case 'ArrowRight':
            bat.moveRight(); // Move the bat right
            break;
        case 'ArrowUp':
            ball.moveUp(); // Move the ball upwards
            break;
    }
});