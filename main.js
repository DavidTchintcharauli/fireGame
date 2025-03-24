import { drawCircle } from "./components/circle.js";
import { drawFirefighter } from "./components/firefighter.js";
import { displayGameOver } from "./components/gameOver.js";
import { gameState, resetGameState } from "./components/gameState.js";
import { drawMap } from "./components/map.js";
import { drawPlant } from "./components/plant.js";
import { checkCollision } from "./utils/collision.js";
import { initDOMElements } from "./utils/domUtils.js";

const { canvas, ctx, startButton, tryAgainButton } = initDOMElements();

const gameConfig = {
  canvasWidth: 800,
  canvasHeight: 600,
  plant: {
    x: 10,
    y: 10,
    width: 50,
    height: 100,
    imageSrc: "./assets/plant.png",
  },
  circle: { x: 400, y: 570, radius: 20, color: "red", speed: 10 },
  treeWidth: 20,
  treeHeight: 50,
  circleRadius: 20,
  waterZone: { x: 200, y: 150, width: 400, height: 300, borderRadius: 40 },
  grassColor: "#8FBC8F",
  waterColor: "#00CED1",
  treeColor: "#228B22",
  trunkColor: "#8B4513",
  burningTreeColor: "red",
  firefighters: [
    {
      x: 600,
      y: 100,
      originalX: 600,
      originalY: 100,
      size: 30,
      velocityX: 2,
      velocityY: 2,
      color: "blue",
      canvasWidth: 800,
      canvasHeight: 600,
      groundLevel: 600,
      randomness: 0.5,
      maxSpeed: 5,
    },
    {
      x: 100,
      y: 200,
      originalX: 100,
      originalY: 200,
      size: 30,
      velocityX: -2,
      velocityY: 2,
      color: "blue",
      canvasWidth: 800,
      canvasHeight: 600,
      groundLevel: 600,
      randomness: 0.5,
      maxSpeed: 5,
    },
    {
        x: 100,
        y: 500,
        originalX: 200,
        originalY: 50,
        size: 30,
        velocityX: -4,
        velocityY: 2,
        color: "blue",
        canvasWidth: 800,
        canvasHeight: 600,
        groundLevel: 600,
        randomness: 0.5,
        maxSpeed: 5,
      },
  ],
  trees: [
    {
      x: 50,
      y: 300,
      burning: false,
      velocity: 2,
      originalX: 50,
      originalY: 300,
    },
    {
      x: 700,
      y: 300,
      burning: false,
      velocity: -2,
      originalX: 700,
      originalY: 300,
    },
  ],
};

const plantImage = new Image();
plantImage.src = gameConfig.plant.imageSrc;

const drawGame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMap(ctx, gameConfig);
  drawPlant(ctx, gameConfig.plant, plantImage);
  drawCircle(ctx, gameState.circleX, gameState.circleY, gameConfig.circle);

  gameConfig.firefighters.forEach(firefighter => {
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
window.addEventListener("keydown", event => {
  if (!gameState.gameOver) {
    const speed = gameConfig.circle.speed;
    const radius = gameConfig.circle.radius;

    switch (event.key) {
      case "a":
        gameState.circleX = Math.max(radius, gameState.circleX - speed);
        break;
      case "d":
        gameState.circleX = Math.min(gameConfig.canvasWidth - radius, gameState.circleX + speed);
        break;
      case "w":
        gameState.circleY = Math.max(radius, gameState.circleY - speed);
        break;
      case "s":
        gameState.circleY = Math.min(gameConfig.canvasHeight - radius, gameState.circleY + speed);
        break;
    }
  }
});
