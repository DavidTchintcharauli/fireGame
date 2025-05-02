import { drawCircle } from "./components/circle.js";
import { drawFirefighter } from "./components/firefighter.js";
import { displayGameOver } from "./components/gameOver.js";
import { gameState, resetGameState } from "./components/gameState.js";
import { drawMap } from "./components/map.js";
import { checkCollision } from "./utils/collision.js";
import { initDOMElements } from "./utils/domUtils.js";
import { gameConfig } from "./config/config.js";
import { setupMovementListeners, handleMovement } from "./utils/movement.js";
import { translations } from "./utils/translations.js";
import { setupSoundToggle } from "./utils/soundToggle.js";

const { canvas, ctx, startButton, tryAgainButton } = initDOMElements();

setupMovementListeners()
setupSoundToggle();
let lakeOffset = 0;

const languageSelect = document.getElementById("languageSelect");
languageSelect.addEventListener("change", (e) => {
  gameState.language = e.target.value;
});

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lakeOffset += 0.5;

  handleMovement(gameState, gameConfig);
  drawMap(ctx, gameConfig, lakeOffset);
  drawCircle(ctx, gameState.circleX, gameState.circleY, gameConfig.circle);

  gameConfig.firefighters.forEach((firefighter) => {
    drawFirefighter(ctx, firefighter, gameConfig);
  });

  const lang = gameState.language;

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`${translations[lang].score}: ${gameState.score}`, 120, 30);

  for (const firefighter of gameConfig.firefighters) {
    const dx = gameState.circleX - firefighter.x;
    const dy = gameState.circleY - firefighter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < gameConfig.circle.radius + firefighter.size / 2) {
      gameState.gameOver = true;
      displayGameOver(ctx, gameConfig, tryAgainButton, translations[lang].gameOverFirefighter);
      return;
    }
  }

  if (checkCollision(gameState.circleX, gameState.circleY, gameConfig)) {
    gameState.gameOver = true;
    displayGameOver(ctx, gameConfig, tryAgainButton, translations[lang].gameOverWater);
    return;
  }

  if (!gameState.gameOver) {
    requestAnimationFrame(drawGame);
  }
};

const startGame = () => {
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.volume = 0.3;
    bgMusic.play().catch((err) => {
      console.log("Music play blocked by browser until user interacts:", err);
    });
  }
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
