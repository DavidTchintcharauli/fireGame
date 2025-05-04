export const keysPressed = {};

export const setupMovementListeners = () => {
  window.addEventListener("keydown", (event) => {
    keysPressed[event.key.toLowerCase()] = true;
  });

  window.addEventListener("keyup", (event) => {
    keysPressed[event.key.toLowerCase()] = false;
  });
};

export const handleMovement = (gameState, gameConfig) => {
  const { speed, radius } = gameConfig.circle;
  let moveX = 0;
  let moveY = 0;

  if (keysPressed["a"] || keysPressed["arrowleft"]) moveX -= 1;
  if (keysPressed["d"] || keysPressed["arrowright"]) moveX += 1;
  if (keysPressed["w"] || keysPressed["arrowup"]) moveY -= 1;
  if (keysPressed["s"] || keysPressed["arrowdown"]) moveY += 1;

  if (moveX === 0 && moveY === 0) return;

  const len = Math.sqrt(moveX * moveX + moveY * moveY);
  if (len !== 0) {
    moveX = (moveX / len) * speed;
    moveY = (moveY / len) * speed;
  }

  gameState.circleX = Math.min(
    gameConfig.canvasWidth - radius,
    Math.max(radius, gameState.circleX + moveX)
  );

  gameState.circleY = Math.min(
    gameConfig.canvasHeight - radius,
    Math.max(radius, gameState.circleY + moveY)
  );
};
