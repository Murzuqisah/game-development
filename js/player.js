import { batX, balls, ballSize, batSpeed, batWidth, gameWidth, currentLevel } from "./init.js";
let ballLaunched = false;

document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            batX.value -= batSpeed;
            if (batX.value < batWidth / 2) batX.value = batWidth / 2;

            // Move the ball with the bat **only if it hasn't been launched**
            if (!ballLaunched && balls.length > 0) {
                balls[0].x = batX.value;
            }
            break;

        case 'ArrowRight':
            batX.value += batSpeed;
            if (batX.value > gameWidth - batWidth / 2) batX.value = gameWidth - batWidth / 2;

            // Move the ball with the bat **only if it hasn't been launched**
            if (!ballLaunched && balls.length > 0) {
                balls[0].x = batX.value;
            }
            break;

        case 'ArrowUp':
            if (!ballLaunched && balls.length > 0) {
                balls[0].dx = 2;
                balls[0].dy = -45 * (1 + 0.5 * (currentLevel - 1));
                ballLaunched = true;
            }
            break;
    }
});