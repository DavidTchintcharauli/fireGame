import { gameState } from "../components/gameState.js";

const treeBurnSound = new Audio('./assets/burn.mp3');
treeBurnSound.volume = 0.4;

const coinSound = new Audio('./assets/coinRecieved.mp3');
coinSound.volume = 0.4;

export const checkCollision = (circleX, circleY, config) => {
  const radius = config.circle.radius * 0.5;

  const { x, y, width, height, borderRadius = 0 } = config.waterZone;

  const cx = circleX;
  const cy = circleY;

  const nearestX = Math.max(x, Math.min(cx, x + width));
  const nearestY = Math.max(y, Math.min(cy, y + height));

  const dx = cx - nearestX;
  const dy = cy - nearestY;

  const distanceToWater = Math.sqrt(dx * dx + dy * dy);
  const inWater = distanceToWater < radius + borderRadius * 0.1;

  config.trees.forEach((tree) => {
    const tx = tree.x + config.treeWidth / 2;
    const ty = tree.y + config.treeHeight;

    const dx = circleX - tx;
    const dy = circleY - ty;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const burnThreshold = radius + 30;

    if (distance < burnThreshold) {
      const isMuted = localStorage.getItem('soundMuted') === 'true';

      if (!tree.burning) {
        tree.burning = true;
        tree.burningStartTime = performance.now();

        if (!isMuted) {
          treeBurnSound.currentTime = 0;
          treeBurnSound.play().catch((e) => console.warn("Burn sound error:", e));
        }
      }

      if (!tree.scored) {
        gameState.score += 1;
        tree.scored = true;

        if (!isMuted) {
          coinSound.currentTime = 0;
          coinSound.play().catch((e) => console.warn("Coin sound error:", e));
        }
      }
    }
  });

  return inWater;
};