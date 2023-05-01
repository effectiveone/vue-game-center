<template>
  <div class="container">
    <div ref="pixiContainer"></div>
    <div v-if="gameIsOver" class="game-over">
      <h2>Game Over</h2>
      <button @click="resetGame">Play Again</button>
    </div>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

export default {
  data() {
    return {
      app: null,
      wallSize: 10,
      snake: [],
      dx: 0,
      dy: 0,
      pauseGame: true,
      food: { x: 0, y: 0, color: 'white' },
      points: 0,
      elapsedTime: 0,
      gameIsOver: false,
    };
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    makeSnake(snakeLength) {
      for (let i = 0; i < snakeLength; i++) {
        let x = this.app.renderer.width / 2 + i * this.wallSize;
        let y = this.app.renderer.height / 2;
        this.snake.push({ x: x, y: y, rect: this.createSnakeRect(x, y) });
      }
    },
    createSnakeRect(x, y) {
      const rect = new PIXI.Graphics();
      rect.lineStyle(5, 0xff0000, 1);
      rect.drawRect(0, 0, this.wallSize, this.wallSize);
      rect.x = x;
      rect.y = y;
      this.app.stage.addChild(rect);
      return rect;
    },
    resetGame() {
    this.snake.forEach((el) => this.app.stage.removeChild(el.rect));
    this.snake = [];
    this.makeSnake(5);
    this.randomFood();
    this.pauseGame = false;
    this.points = 0;
    this.gameIsOver = false;
    this.elapsedTime = 0;
  },
  // keyUp(e) {
  //   this.restartGame(e);
  // },
    moveSnake(dx, dy) {
      let headX = this.snake[0].x + dx;
      let headY = this.snake[0].y + dy;
      const newHeadRect = this.createSnakeRect(headX, headY);
      this.snake.unshift({ x: headX, y: headY, rect: newHeadRect });
      const tail = this.snake.pop();
      this.app.stage.removeChild(tail.rect);
    },
    keyDown(e) {
      if (this.pauseGame) this.pauseGame = false;

      switch (e.keyCode) {
        case 37: // left
        case 65: // a
          this.dy = 0;
          this.dx = -10;
          break;
        case 38: // up
        case 87: // w
          this.dy = -10;
          this.dx = 0;
          break;
        case 39: // right
        case 68: // d
          this.dy = 0;
          this.dx = 10;
          break;
        case 40: // down
        case 83: // s
          this.dy = 10;
          this.dx = 0;
          break;
      }
    },
    randomFood() {
      function randV(min, max) {
        return (
          Math.floor(
            (Math.random() * (max - min) + min) / this.wallSize
          ) * this.wallSize
        );
      }

      let colors = ['yellow', 'silver', 'white', 'orange'];
      this.food.color = colors[Math.floor(Math.random() * colors.length)];

      this.food.x = randV.call(this, 20, this.app.renderer.width - 20);
      this.food.y = randV.call(this, 20, this.app.renderer.height - 20);
      this.drawFood();
    },
    drawFood() {
      if (this.food.rect) {
        this.app.stage.removeChild(this.food.rect);
      }
  this.food.rect = new PIXI.Graphics();
  this.food.rect.beginFill(PIXI.utils.string2hex(this.food.color));
  this.food.rect.drawRect(0, 0, this.wallSize, this.wallSize);
  this.food.rect.endFill();
  this.food.rect.x = this.food.x;
  this.food.rect.y = this.food.y;
  this.app.stage.addChild(this.food.rect);
},
checkWallsCollision() {
  const head = this.snake[0];
  if (
    head.x > this.app.renderer.width ||
    head.x < 0 ||
    head.y > this.app.renderer.height ||
    head.y < 0
  ) {
    this.gameOver();
  }
},
checkFoodCollision() {
  const head = this.snake[0];
  if (this.food.x === head.x && this.food.y === head.y) {
    this.snake.push(
      Object.assign({}, this.snake[this.snake.length - 1])
    );
    this.randomFood();
    this.points++;
  }
},
drawPoints() {
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fill: 'white',
  });

  if (this.pointsText) {
    this.app.stage.removeChild(this.pointsText);
  }

  this.pointsText = new PIXI.Text(`Points: ${this.points}`, style);
  this.pointsText.x = 10;
  this.pointsText.y = 0;
  this.app.stage.addChild(this.pointsText);
},
startApp() {
  this.app = new PIXI.Application({
    width: 400,
    height: 400,
    backgroundColor: 0x000000,
  });

  this.$refs.pixiContainer.appendChild(this.app.view);

  document.addEventListener('keydown', this.keyDown);

  this.resetGame();

  this.app.ticker.add(() => {
    this.checkWallsCollision();
    this.checkFoodCollision();
    if (!this.pauseGame) this.moveSnake(this.dx, this.dy);
    this.drawPoints();
    this.drawFood();
    this.updateElapsedTime();
  });
},
updateElapsedTime() {
    if (!this.pauseGame) {
      this.elapsedTime += this.app.ticker.deltaMS;
    }
  },
gameOver() {
    // Dodawanie wyniku do sklepu
    this.$store.dispatch("score/addScore", {
      game: "snake",
      time: this.elapsedTime,
      score: this.points
    });


    // Ustawienie stanu gry na zakończony
    this.pauseGame = true;
    this.gameIsOver = true;
  },
  // restartGame(e) {
  //   if (this.pauseGame && e.keyCode === 82) { // R
  //     this.resetGame();
  //   }
  // },
},
mounted() {
window.addEventListener('load', this.startApp);
},
};
</script>

<style scoped>
.pixi-container {
  border: 3px solid white;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.container {
  position: relative;
  display: grid;
  place-items: center;
}
body {
  background-color: black;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>