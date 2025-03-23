export const drawPlant = (ctx, plant, img) => {
    ctx.drawImage(img, plant.x, plant.y, plant.width, plant.height);
};
