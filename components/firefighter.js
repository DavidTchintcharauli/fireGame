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

    // Move the firefighter randomly
    firefighter.x += firefighter.velocityX;
    firefighter.y += firefighter.velocityY;

    // Keep firefighter within canvas bounds
    if (firefighter.x < 0 || firefighter.x + firefighter.size > firefighter.canvasWidth) {
        firefighter.velocityX = -firefighter.velocityX;
    }
    if (firefighter.y < 0 || firefighter.y + firefighter.size > firefighter.groundLevel) {
        firefighter.velocityY = -firefighter.velocityY;
    }

    // Prevent firefighter from entering the water zone
    const isInWater =
        firefighter.x + firefighter.size > config.waterZone.x &&
        firefighter.x < config.waterZone.x + config.waterZone.width &&
        firefighter.y + firefighter.size > config.waterZone.y &&
        firefighter.y < config.waterZone.y + config.waterZone.height;

    if (isInWater) {
        firefighter.velocityY = -firefighter.velocityY; // Reverse direction vertically
        firefighter.velocityX = -firefighter.velocityX; // Reverse direction horizontally
    }

    // Draw the firefighter
    ctx.fillStyle = firefighter.color;
    ctx.beginPath();
    ctx.arc(
        firefighter.x + firefighter.size / 2,
        firefighter.y + firefighter.size / 2,
        firefighter.size / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
};