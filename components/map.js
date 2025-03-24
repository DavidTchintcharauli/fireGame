export const drawTree = (ctx, tree, config) => {
    tree.x += tree.velocity;

    const isInWater =
        tree.x + config.treeWidth > config.waterZone.x &&
        tree.x < config.waterZone.x + config.waterZone.width;

    if (isInWater) {
        tree.burning = false;
        tree.velocity = -tree.velocity;
    } else if (tree.x < 0 || tree.x + config.treeWidth > config.canvasWidth) {
        tree.velocity = -tree.velocity;
    }

    ctx.fillStyle = config.trunkColor;
    ctx.fillRect(tree.x + config.treeWidth / 2 - 5, tree.y + config.treeHeight, 10, config.treeHeight);

    ctx.fillStyle = tree.burning ? config.burningTreeColor : config.treeColor;

    ctx.beginPath();
    ctx.arc(tree.x + config.treeWidth / 2, tree.y + config.treeHeight - 30, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(tree.x + config.treeWidth / 2 - 20, tree.y + config.treeHeight - 10, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(tree.x + config.treeWidth / 2 + 20, tree.y + config.treeHeight - 10, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(tree.x + config.treeWidth / 2, tree.y + config.treeHeight + 5, 20, 0, Math.PI * 2);
    ctx.fill();
};


const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
};

export const drawMap = (ctx, config, lakeOffset = 0) => {
    const { x, y, width, height, borderRadius = 30 } = config.waterZone;
  
    ctx.fillStyle = config.grassColor;
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);
  
    const gradient = ctx.createRadialGradient(
      x + width / 2, y + height / 2, width / 10,
      x + width / 2, y + height / 2, width / 2
    );
    gradient.addColorStop(0, "#B0E0E6");
    gradient.addColorStop(1, config.waterColor);
  
    ctx.fillStyle = gradient;
    drawRoundedRect(ctx, x, y, width, height, borderRadius);
    ctx.fill();
  
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
  
    const waveCount = 5;
    for (let i = 0; i < waveCount; i++) {
      const offsetY = y + height / 5 + i * 20 + Math.sin((lakeOffset + i * 20) * 0.05) * 5;
  
      ctx.beginPath();
      ctx.moveTo(x + 10, offsetY);
      ctx.quadraticCurveTo(
        x + width / 2,
        offsetY + 5 * Math.sin((lakeOffset + i * 15) * 0.1),
        x + width - 10,
        offsetY
      );
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    drawRoundedRect(ctx, x + 2, y + 2, width - 4, height - 4, borderRadius - 4);
    ctx.stroke();
  
    config.trees.forEach(tree => drawTree(ctx, tree, config));
  };
  
