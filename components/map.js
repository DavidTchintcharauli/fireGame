export const drawTree = (ctx, tree, config) => {
    // Move the tree horizontally
    tree.x += tree.velocity;

    // Check if the tree is in the water zone
    const isInWater =
        tree.x + config.treeWidth > config.waterZone.x &&
        tree.x < config.waterZone.x + config.waterZone.width;

    // Reverse direction and set the tree's state based on its location
    if (isInWater) {
        tree.burning = false; // Reset tree to green if it crashes into water
        tree.velocity = -tree.velocity; // Reverse direction
    } else if (tree.x < 0 || tree.x + config.treeWidth > config.canvasWidth) {
        tree.velocity = -tree.velocity; // Bounce back at canvas edges
    }

    // Draw the trunk
    ctx.fillStyle = config.trunkColor;
    ctx.fillRect(tree.x, tree.y + config.treeHeight, config.treeWidth, config.treeHeight);

    // Draw the leaves
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
