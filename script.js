const startButton = document.getElementById("start-button");
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreElement = document.getElementById("score");

let gameInterval;
let obstacleInterval;
let score = 0;
let isGameRunning = false;

// Player movement
document.addEventListener("keydown", (e) => {
  if (!isGameRunning) return;

  const playerRect = player.getBoundingClientRect();
  const gameAreaRect = gameArea.getBoundingClientRect();

  if (e.key === "ArrowLeft" && playerRect.left > gameAreaRect.left) {
    player.style.left = `${player.offsetLeft - 20}px`;
  }

  if (e.key === "ArrowRight" && playerRect.right < gameAreaRect.right) {
    player.style.left = `${player.offsetLeft + 20}px`;
  }
});

// Start the game
function startGame() {
  score = 0;
  scoreElement.textContent = score;
  isGameRunning = true;
  startButton.disabled = true;

  gameInterval = setInterval(() => {
    score++;
    scoreElement.textContent = score;
  }, 1000);

  obstacleInterval = setInterval(createObstacle, 1000);
}

// Create a falling obstacle
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  // Set random horizontal position for the obstacle
  obstacle.style.left = `${Math.floor(Math.random() * (gameArea.clientWidth - 40))}px`;
  obstacle.style.top = "0px";
  gameArea.appendChild(obstacle);

  const obstacleFallInterval = setInterval(() => {
    const obstacleRect = obstacle.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // Check if the obstacle hits the player
    if (
      obstacleRect.top + obstacleRect.height > playerRect.top &&
      obstacleRect.left < playerRect.right &&
      obstacleRect.right > playerRect.left
    ) {
      endGame();
      clearInterval(obstacleFallInterval);
    }

    // Move the obstacle down
    if (obstacle.offsetTop < gameArea.clientHeight) {
      obstacle.style.top = `${obstacle.offsetTop + 5}px`;
    } else {
      // Remove obstacle if it goes out of the game area
      obstacle.remove();
      clearInterval(obstacleFallInterval);
    }
  }, 20);
}

// End the game
function endGame() {
  isGameRunning = false;
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  alert(`Game Over! Your score is ${score}`);
  startButton.disabled = false;

  // Remove all obstacles
  document.querySelectorAll(".obstacle").forEach((obstacle) => obstacle.remove());
}

startButton.addEventListener("click", startGame);
