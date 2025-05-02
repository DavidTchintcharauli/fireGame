const gameOverSound = new Audio('./assets/gameOver.mp3');
gameOverSound.volume = 0.6;
gameOverSound.preload = 'auto';

export const playGameOverSound = () => {
  const isMuted = localStorage.getItem('soundMuted') === 'true';
  if (isMuted) return;

  gameOverSound.currentTime = 0;
  gameOverSound.play().catch((err) => {
    console.log("Game Over sound error:", err);
  });
};
