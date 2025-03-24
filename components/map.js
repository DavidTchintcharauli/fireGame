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

export const drawMap = (ctx, config) => {
    ctx.fillStyle = config.grassColor;
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    ctx.fillStyle = config.waterColor;
    const { x, y, width, height } = config.waterZone;
    ctx.fillRect(x, y, width, height);

    config.trees.forEach(tree => drawTree(ctx, tree, config));
};
