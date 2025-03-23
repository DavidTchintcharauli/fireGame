export const gameState = {
    circleX: 400,
    circleY: 570,
    gameOver: false,
    score: 0,
};

export const resetGameState = (config) => {
    gameState.circleX = config.circle.x;
    gameState.circleY = config.circle.y;
    gameState.gameOver = false;
    gameState.score = 0;

    // Reset trees to their initial positions and states
    config.trees.forEach(tree => {
        tree.x = tree.originalX;
        tree.y = tree.originalY;
        tree.burning = false;
        tree.score = false;
    });

    config.firefighters.forEach(firefighter => {
        firefighter.x = firefighter.originalX;
        firefighter.y = firefighter.originalY;
    });

};
