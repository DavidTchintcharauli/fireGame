export const displayGameOver = (ctx, config, tryAgainButton, reason = 'Game Over!') => {
    // Set text properties
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';

    // Split the reason text into lines
    const lines = reason.split('\n');
    const lineHeight = 25; // Approximate height per line

    // Determine the maximum text width among all lines (including the "Try Again!" prompt)
    let maxTextWidth = 0;
    lines.forEach(line => {
        const metrics = ctx.measureText(line);
        maxTextWidth = Math.max(maxTextWidth, metrics.width);
    });
    const tryAgainMetrics = ctx.measureText('Try Again!');
    maxTextWidth = Math.max(maxTextWidth, tryAgainMetrics.width);

    // Define padding around the text
    const paddingX = 40;
    const paddingY = 20;

    // Calculate the background rectangle dimensions
    const rectWidth = maxTextWidth + paddingX * 2;
    // Total height: text lines + one extra line for "Try Again!" plus vertical padding
    const rectHeight = (lines.length + 1) * lineHeight + paddingY * 2;

    // Center the rectangle on the canvas
    const rectX = config.canvasWidth / 2 - rectWidth / 2;
    const rectY = config.canvasHeight / 2 - rectHeight / 2;

    // Draw the semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Set text color and start drawing text inside the rectangle
    ctx.fillStyle = 'white';
    let textY = rectY + paddingY + lineHeight; // Baseline for the first line

    // Draw each line of the game over message
    lines.forEach(line => {
        ctx.fillText(line, config.canvasWidth / 2, textY);
        textY += lineHeight;
    });

    // Draw the "Try Again!" prompt on the next line
    ctx.fillText('Try Again!', config.canvasWidth / 2, textY);

    // Position the try again button just below the background
    tryAgainButton.style.display = 'block';
    tryAgainButton.style.position = 'absolute';
    tryAgainButton.style.top = `${rectY + rectHeight + 10}px`;
    tryAgainButton.style.left = '50%';
    tryAgainButton.style.transform = 'translateX(-50%)';
};
