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
    ctx.fillRect(tree.x, tree.y + config.treeHeight, config.treeWidth, config.treeHeight);

    ctx.fillStyle = tree.burning ? config.burningTreeColor : config.treeColor;
    ctx.beginPath();
    ctx.arc(tree.x + config.treeWidth / 2, tree.y + config.treeHeight - 20, 30, 0, Math.PI * 2);
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
    ctx.fill();
};

export const drawMap = (ctx, config) => {
    ctx.fillStyle = config.grassColor;
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    ctx.fillStyle = config.waterColor;
    const { x, y, width, height, borderRadius = 30 } = config.waterZone;
    drawRoundedRect(ctx, x, y, width, height, borderRadius)

    config.trees.forEach(tree => drawTree(ctx, tree, config));
};
