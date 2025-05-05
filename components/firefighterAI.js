export const updateFirefighterBehavior = (firefighter, playerX, playerY) => {
    const dx = playerX - firefighter.x;
    const dy = playerY - firefighter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < firefighter.detectionRadius) {
      const speed = Math.sqrt(firefighter.velocityX ** 2 + firefighter.velocityY ** 2);
      const angle = Math.atan2(dy, dx);
  
      firefighter.velocityX = Math.cos(angle) * speed;
      firefighter.velocityY = Math.sin(angle) * speed;
    }
  };
  
