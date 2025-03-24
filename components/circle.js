export const drawCircle = (ctx, x, y, circle) => {
    const radius = circle.radius;
  
    const glowGradient = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2);
    glowGradient.addColorStop(0, 'rgba(255, 140, 0, 0.8)');
    glowGradient.addColorStop(0.4, 'rgba(255, 69, 0, 0.4)');
    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
    ctx.beginPath();
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();
  
    const flameGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    flameGradient.addColorStop(0, 'yellow');
    flameGradient.addColorStop(0.4, 'orange');
    flameGradient.addColorStop(1, 'red');
  
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = flameGradient;
    ctx.fill();
  
    for (let i = 0; i < 3; i++) {
      const offsetX = (Math.random() - 0.5) * radius * 2;
      const offsetY = (Math.random() - 1.5) * radius;
      ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  