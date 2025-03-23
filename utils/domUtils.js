export const initDOMElements = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const tryAgainButton = document.getElementById('tryAgainButton');
    return { canvas, ctx, startButton, tryAgainButton };
}