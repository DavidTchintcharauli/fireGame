import { drawCircle } from "./components/circle.js";
import { drawFirefighter } from "./components/firefighter.js";
import { displayGameOver } from "./components/gameOver.js";
import { gameState, resetGameState } from "./components/gameState.js";
import { drawMap } from "./components/map.js";
import { checkCollision } from "./utils/collision.js";
import { initDOMElements } from "./utils/domUtils.js";
import { gameConfig } from "./config/config.js";

import { setupMovementListeners, handleMovement } from "./utils/movement.js";

const { canvas, ctx, startButton, tryAgainButton } = initDOMElements();

setupMovementListeners();
let lakeOffset = 0;

const plantImage = new Image();
plantImage.src = gameConfig.plant.imageSrc;

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lakeOffset += 0.5;

  handleMovement(gameState, gameConfig);
  drawMap(ctx, gameConfig, lakeOffset);
  drawCircle(ctx, gameState.circleX, gameState.circleY, gameConfig.circle);

  gameConfig.firefighters.forEach((firefighter) => {
    drawFirefighter(ctx, firefighter, gameConfig);
  });

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${gameState.score}`, 120, 30);

  for (const firefighter of gameConfig.firefighters) {
    const dx = gameState.circleX - firefighter.x;
    const dy = gameState.circleY - firefighter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < gameConfig.circle.radius + firefighter.size / 2) {
      gameState.gameOver = true;
      displayGameOver(
        ctx,
        gameConfig,
        tryAgainButton,
        "Your fire has been extinguished! The flames were caught by the firefighter's water ball.\nThe blaze is down, and your efforts to spread the fire have come to an end.\n\nBetter luck next time! Avoid the firefighter's water ball!"
      );
      return;
    }
  }

  if (checkCollision(gameState.circleX, gameState.circleY, gameConfig)) {
    gameState.gameOver = true;
    displayGameOver(
      ctx,
      gameConfig,
      tryAgainButton,
      "Your fire has been extinguished! The flames got too close to the water lake.\nThe blaze is down, and your efforts to spread the fire have come to an end.\n\nBetter luck next time! Stay away from water!"
    );
    return;
  }

  if (!gameState.gameOver) {
    requestAnimationFrame(drawGame);
  }
};


const startGame = () => {
  startButton.style.display = "none";
  canvas.style.display = "block";
  gameState.gameOver = false;
  drawGame();
};

const resetGame = () => {
  resetGameState(gameConfig);
  tryAgainButton.style.display = "none";
  drawGame();
};

startButton.addEventListener("click", startGame);
tryAgainButton.addEventListener("click", resetGame);

window.addEventListener("keydown", (event) => {
  if (gameState.gameOver) {
    if (event.key === "Enter" || event.key === " ") {
      resetGame();
    }
  }
});