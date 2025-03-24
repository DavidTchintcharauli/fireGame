export const displayGameOver = (ctx, config, tryAgainButton, reason = 'Game Over!') => {
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    const lines = reason.split('\n');
    const lineHeight = 25;

    let maxTextWidth = 0;
    lines.forEach(line => {
        const metrics = ctx.measureText(line);
        maxTextWidth = Math.max(maxTextWidth, metrics.width);
    });
    const tryAgainMetrics = ctx.measureText('Try Again!');
    maxTextWidth = Math.max(maxTextWidth, tryAgainMetrics.width);

    const paddingX = 320;
    const paddingY = 230;

    const rectWidth = maxTextWidth + paddingX * 2;
    const rectHeight = (lines.length + 1) * lineHeight + paddingY * 2;

    const rectX = config.canvasWidth / 2 - rectWidth / 2;
    const rectY = config.canvasHeight / 2 - rectHeight / 2;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    ctx.fillStyle = 'white';
    let textY = rectY + paddingY + lineHeight;

    lines.forEach(line => {
        ctx.fillText(line, config.canvasWidth / 2, textY);
        textY += lineHeight;
    });

    ctx.fillText('', config.canvasWidth / 2, textY);

    tryAgainButton.style.display = 'block';
    tryAgainButton.style.position = 'absolute';
    tryAgainButton.style.top = `${rectY + rectHeight + 10}px`;
    tryAgainButton.style.left = '50%';
    tryAgainButton.style.transform = 'translateX(-50%)';
};
