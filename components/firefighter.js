export const drawFirefighter = (ctx, firefighter, config) => {
    const randomness = firefighter.randomness || 0.9;
    firefighter.velocityX += (Math.random() - 0.5) * randomness;
    firefighter.velocityY += (Math.random() - 0.5) * randomness;
  
    const maxSpeed = firefighter.maxSpeed || 5;
    let speed = Math.sqrt(firefighter.velocityX ** 2 + firefighter.velocityY ** 2);
    if (speed > maxSpeed) {
      firefighter.velocityX = (firefighter.velocityX / speed) * maxSpeed;
      firefighter.velocityY = (firefighter.velocityY / speed) * maxSpeed;
    }
  
    firefighter.x += firefighter.velocityX;
    firefighter.y += firefighter.velocityY;
  
    if (firefighter.x < 0 || firefighter.x + firefighter.size > firefighter.canvasWidth) {
      firefighter.velocityX = -firefighter.velocityX;
    }
    if (firefighter.y < 0 || firefighter.y + firefighter.size > firefighter.groundLevel) {
      firefighter.velocityY = -firefighter.velocityY;
    }
  
    const isInWater =
      firefighter.x + firefighter.size > config.waterZone.x &&
      firefighter.x < config.waterZone.x + config.waterZone.width &&
      firefighter.y + firefighter.size > config.waterZone.y &&
      firefighter.y < config.waterZone.y + config.waterZone.height;
  
    if (isInWater) {
      firefighter.velocityY = -firefighter.velocityY;
      firefighter.velocityX = -firefighter.velocityX;
    }

    const centerX = firefighter.x + firefighter.size / 2;
    const centerY = firefighter.y + firefighter.size / 2;
    const size = firefighter.size;

    ctx.beginPath();
    ctx.arc(centerX, centerY, firefighter.detectionRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([])
  
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + size * 0.6, size * 0.4, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.fillStyle = firefighter.color;
    ctx.beginPath();
    ctx.roundRect(centerX - size * 0.3, centerY - size * 0.5, size * 0.6, size, 8);
    ctx.fill();
  
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.6, size * 0.25, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.arc(centerX, centerY - size * 0.6, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
  
    const hoseStartX = centerX;
    const hoseStartY = centerY;
  
    const streamLength = 30;
    const angle = Math.atan2(firefighter.velocityY, firefighter.velocityX);
    const hoseEndX = hoseStartX + Math.cos(angle) * streamLength;
    const hoseEndY = hoseStartY + Math.sin(angle) * streamLength;
  
    ctx.strokeStyle = "#00BFFF";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(hoseStartX, hoseStartY);
    ctx.lineTo(hoseEndX, hoseEndY);
    ctx.stroke();
  
    for (let i = 0; i < 5; i++) {
      const offsetX = Math.random() * 8 - 4;
      const offsetY = Math.random() * 8 - 4;
      ctx.fillStyle = "rgba(173, 216, 230, 0.5)";
      ctx.beginPath();
      ctx.arc(hoseEndX + offsetX, hoseEndY + offsetY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  