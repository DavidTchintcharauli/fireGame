import { gameState } from "../components/gameState.js";

export const checkCollision = (circleX, circleY, config) => {
    const { x, y, width, height } = config.waterZone;
    const radius = config.circle.radius;

    const waterCollision =
        circleX + radius > x &&
        circleX - radius < x + width &&
        circleY + radius > y &&
        circleY - radius < y + height;

    config.trees.forEach(tree => {
        const distance = Math.sqrt(
            Math.pow(circleX - (tree.x + 10), 2) +
            Math.pow(circleY - (tree.y + 30), 2)
        );

        if (distance < radius + 30 && !tree.burning) {
            tree.burning = true;

            if (!tree.scored){
                gameState.score += 1;
                tree.score = true;
            }
        }
    });

    return waterCollision; 
};
