document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case (e.code === 'Space'):
            if (player.isJumping === false) {
                player.isJumping = true;
                player.jump();
            }
    }
});