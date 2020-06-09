const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
let balls = [];
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    //Bouncing off right edge
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    //Bouncing off left edge
    if (this.x + this.size <= 0) {
      this.velX = -this.velX;
    }
    //Bouncing off bottom edge
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    //Bouncing off top edge
    if (this.y + this.size <= 0) {
      this.velY = -this.velY;
    }
    //make it fly !!!
    this.x += this.velX;
    this.y += this.velY;
  }
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color =
            "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")";
        }
      }
    }
  }
}
while (balls.length < 25) {
  let size = random(10, 20);
  let posX = random(0 + size, width - size);
  let posY = random(0 + size, height - size);
  let velX = random(-7, 7);
  let velY = random(-7, 7);
  let color =
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
  let ball = new Ball(posX, posY, velX, velY, color, size);
  balls.push(ball);
}
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
