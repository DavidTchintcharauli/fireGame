class SmokeParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 10 + 5;
      this.opacity = 1;
      this.dy = Math.random() * -1.5 - 0.5;
      this.dx = (Math.random() - 0.5) * 0.5;
      this.life = 0;
      this.maxLife = 80 + Math.random() * 30;
    }
  
    update() {
      this.x += this.dx;
      this.y += this.dy;
      this.life++;
      this.opacity = Math.max(0, 1 - this.life / this.maxLife);
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(100, 100, 100, ${this.opacity})`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  
    isAlive() {
      return this.life < this.maxLife;
    }
  }
  
  export const playExtinguishWithSmoke = (ctx, x, y, circle, callback) => {
    const particles = [];
    const maxFrames = 90;
    let frame = 0;
  
    const animate = () => {
  
      const radius = circle.radius * (1 - frame / maxFrames);
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glowGradient.addColorStop(0, `rgba(180, 80, 0, ${1 - frame / maxFrames})`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
  
      if (frame % 2 === 0 && frame < maxFrames - 10) {
        for (let i = 0; i < 4; i++) {
          particles.push(new SmokeParticle(x, y));
        }
      }
  
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
  
      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].isAlive()) {
          particles.splice(i, 1);
        }
      }
  
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        callback();
      }
    };
  
    animate();
  };
  