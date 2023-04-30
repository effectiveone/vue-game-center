<template>
  <div class="container">
  <canvas ref="canvas"></canvas>
</div>
</template>

<script>
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 600;
    this.canvas.height = 300;
    this.context = canvas.getContext("2d");
  }

  getContext() {
    return this.context;
  }

  clearCanvas(clearColor = "white") {
    this.drawRect(0, 0, this.canvas.width, this.canvas.height, clearColor);
  }

  drawRect(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  drawCircle(x, y, radius, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.closePath();
    this.context.fill();
  }

  drawText(str, x, y, color, font = "40px Verdana") {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.fillText(str, x, y);
  }
}

class Ball {
  constructor(radius) {
    this.radius = radius;
    this.x = 0;
    this.y = 0;
    this.dx = 2;
    this.dy = -2;
  }

  checkWallCollision() {
    if (this.x + this.dx - this.radius < 0 || this.x + this.dx + this.radius > this.canvas.width) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy - this.radius < 0) {
      this.dy = -this.dy;
    }
  }

  update() {
    this.checkWallCollision(); // Add this line
    this.x += this.dx;
    this.y += this.dy;
  }

  draw() {
    const context = this.renderer.getContext();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "blue";
    context.fill();
    context.closePath();
  }

  checkPaddleCollision(paddle) {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + this.radius >= paddle.y
    ) {
      this.dy = -this.dy;
      return true;
    }
    return false;
  }

  checkBottomWallCollision() {
    if (this.y + this.radius > this.canvas.height) {
      return true;
    }
    return false;
  }

  restart() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }
}

class Paddle {
  constructor(canvas) {
    this.canvas = canvas;
    this.height = 10;
    this.width = 75;
    this.x = (this.canvas.width - this.width) / 2;
    this.y = this.canvas.height - this.height;
    this.rightPressed = false;
    this.leftPressed = false;

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
  }
  

   

  keyDownHandler = (e) => {
    if (e.keyCode == 39) {
      this.rightPressed = true;
    } else if (e.keyCode == 37) {
      this.leftPressed = true;
    }
  };

  keyUpHandler = (e) => {
    if (e.keyCode == 39) {
      this.rightPressed = false;
    } else if (e.keyCode == 37) {
      this.leftPressed = false;
    }
  };

  update() {
    if (this.rightPressed && this.x < this.canvas.width - this.width) {
      this.x += 7;
    } else if (this.leftPressed && this.x > 0) {
this.x -= 7;
}
}

draw() {
const context = this.renderer.getContext();
context.beginPath();
context.rect(this.x, this.y, this.width, this.height);
context.fillStyle = "red";
context.fill();
context.closePath();
}
}

class Bricks {
constructor() {
this.rowCount = 3;
this.columnCount = 7;
this.width = 70;
this.height = 20;
this.padding = 10;
this.offsetTop = 30;
this.offsetLeft = 30;

this.bricks = [];

for (let c = 0; c < this.columnCount; c++) {
  this.bricks[c] = [];
  for (let r = 0; r < this.rowCount; r++) {
    this.bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

}

detectBallCollision(ball) {
for (let c = 0; c < this.columnCount; c++) {
for (let r = 0; r < this.rowCount; r++) {
let brick = this.bricks[c][r];

if (brick.status == 1) {
      if (
        ball.x > brick.x &&
        ball.x < brick.x + this.width &&
        ball.y > brick.y &&
        ball.y < brick.y + this.height
      ) {
        ball.dy = -ball.dy;
        brick.status = 0;
        return true;
      }
    }
  }
}

return false;

}

checkAllBricksDestroyed() {
for (let c = 0; c < this.columnCount; c++) {
for (let r = 0; r < this.rowCount; r++) {
if (this.bricks[c][r].status == 1) {
return false;
}
}
}
return true;
}

draw() {
const context = this.renderer.getContext();
for (let c = 0; c < this.columnCount; c++) {
for (let r = 0; r < this.rowCount; r++) {
if (this.bricks[c][r].status == 1) {
let brickX =
c * (this.width + this.padding) + this.offsetLeft;
let brickY =
r * (this.height + this.padding) + this.offsetTop;
this.bricks[c][r].x = brickX;
this.bricks[c][r].y = brickY;
context.beginPath();
context.rect(brickX, brickY, this.width, this.height);
context.fillStyle = "green";
context.fill();
context.closePath();
}
}
}
}

restart() {
for (let c = 0; c < this.columnCount; c++) {
for (let r = 0; r < this.rowCount; r++) {
this.bricks[c][r].status = 1;
}
}
}
}

export default {
name: "Game",
data() {
return {
ballRadius: 10,
score: 0,
lives: 4,
paddleBallHit: 0,
renderer: null,
canvas: null,
context: null,
ball: null,
paddle: null,
bricks: null,
fps: 60,
};
},
mounted() {
  this.canvas = this.$refs.canvas;
  this.renderer = new Renderer(this.canvas);
  this.ball = new Ball(this.ballRadius);

  this.ball.canvas = this.canvas;
  this.ball.renderer = this.renderer;
  this.paddle = new Paddle(this.canvas); // Pass the canvas as a parameter
  this.paddle.renderer = this.renderer;

  this.bricks = new Bricks();
  this.bricks.canvas = this.canvas;
  this.bricks.renderer = this.renderer;

  this.startGame();
  this.ball.restart();
},

methods: {
startGame() {
setInterval(this.updateGame, 1000 / this.fps);
},
updateGame() {
// game logic
this.paddle.update(); 
  this.ball.update();

  if (this.ball.checkPaddleCollision(this.paddle)) {
    console.log("odbicie piłki paletką");
    this.paddleBallHit++;
  }


  if (this.ball.checkBottomWallCollision()) {
    console.log("strata życia");
    this.lives--;
    this.ball.restart();
  }

  if (this.bricks.detectBallCollision(this.ball)) {
    this.score++;
  }

  if (this.lives <= 0) {
    console.log("koniec żyć, restart gry");
    this.restart();
  }

  if (this.bricks.checkAllBricksDestroyed()) {
    console.log("Gracz zniszczył wszystkie cegły");
    this.restart();
  }

  this.render();
},
render() {
  this.renderer.clearCanvas();

  this.bricks.draw();
  this.ball.draw(); // Add this line to draw the ball
  this.paddle.draw();

  this.renderer.drawText(
    "Punkty: " + this.score,
    10,
    20,
    "black",
    "20px Verdana"
  );

  this.renderer.drawText(
    "Życia: " + this.lives,
    130,
    20,
    "black",
    "20px Verdana"
  );
},

restart() {
  this.ball.restart();
  this.score = 0;
  this.lives = 4;
  this.bricks.restart();
},
},
};

</script>
<style scoped>
  canvas {
    display: block;
    margin: 0 auto;
    border: 1px solid black;
  }
  .container {
    height: 500px;
    display: grid;
place-items: center;
  }
</style>

