export const drawCircle = (ctx, x, y, circle) => {
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(x, y, circle.radius, 0, Math.PI * 2);
    ctx.fill()
}