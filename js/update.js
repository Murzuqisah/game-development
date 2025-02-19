function showLevelCompletedOverlay() {
  if (!gameArea) {
    console.error("Error: gameArea not found!")
  }
  var overlay = document.createElement('div');
  overlay.id = "levelStep";
  overlay.innerHTML = `<div>Level Complete!</div>
                        <button onclick="advanceLevel()">Next Level</button>`;
  gameArea.appendChild(overlay);
}

function showGameOverMessage(msg) {
  let gameOverElem = document.createElement('div');
  gameOverElem.id = 'gameOverMessage';
  gameOverElem.innerHTML = msg || 'Game Over!';
  gameOverElem.style.position = 'absolute';
  gameOverElem.style.top = '50%';
  gameOverElem.style.left = '50%';
  gameOverElem.style.transform = 'translate(-50%, -50%)';
  gameOverElem.style.padding = '20px';
  gameOverElem.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  gameOverElem.style.color = '#fff';
  gameOverElem.style.fontSize = '24px';
  gameOverElem.style.textAlign = 'center';
  gameOverElem.style.borderRadius = '10px';
  gameArea.appendChild(gameOverElem);
  setTimeout(function () {
    gameOverElem.remove();
    startButton.style.display = "inline-block";
    startButton.textContent = "Restart";
    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
    endButton.style.display = "none";
  }, 3000);
}

function gameEndedOverlay() {
  if (!gameArea) {
    console.error('gameArea not found!')
  }

  let overlay = document.createElement('div')
  overlay.id = 'levelStep';
  overlay.innerHTML = `<div> You died </div>
                        <button onclick=startGame()> Restart Game </button>`;
  gameArea.appendChild(overlay);
}