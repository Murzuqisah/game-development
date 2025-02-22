import { batX, balls, batSpeed, batWidth, gameWidth, currentLevel } from "./init.js";

document.addEventListener('keydown', function (e) {
    switch (e.code) {
        case 'ArrowLeft':
            batX.value -= batSpeed;
            if (batX.value < batWidth / 2) batX.value = batWidth / 2;
            break;
        case 'ArrowRight':
            batX.value += batSpeed;
            if (batX.value > gameWidth - batWidth / 2) batX.value = gameWidth - batWidth / 2;
            break;
        case 'ArrowUp':
            if (balls.length > 0 && balls[0].dy === 0) {
                balls[0].dy = -45 * (1 + 0.5 * (currentLevel - 1));
            }
            break;
    }
});