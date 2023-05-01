<template>
  <div id="tetris-game">
    <canvas ref="canvas"></canvas>
    <div v-if="gameIsOver" class="game-over">
      <h2>Game Over</h2>
      <button @click="resetGame">Play Again</button>
    </div>
  </div>
</template>



<script>
import Block from "../../components/tetris/Block.js";
import Board from "../../components/tetris/Board.js";
import { mapActions } from "vuex";
export default {
  name: "Tetris",

  data() {
    return {
      board: null,
      block: null,
      lastDropTime: null,
      gameIsOver: false,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapActions("score", ["addScore"]),
    async init() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");

      this.board = new Board({
        width: this.canvas.width,
        height: this.canvas.height,
        squareSize: 20,
      });



      this.block = new Block(this.board);
      await this.block.init();

      this.block.nextBlock();
      this.initControls();

      this.startGame();
    },

    resetGame() {
      this.gameIsOver = false;

      this.block = new Block(this.board);
      this.block.init().then(() => {
        this.block.nextBlock();
      });

      // Resetujemy również planszę
      this.board.reset();

      this.startGame();
    },

    initControls() {
      document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowLeft") {
          if (!this.block.checkCollision(-1, 0)) {
            this.block.moveLeft();
          }
        } else if (e.key == "ArrowUp") {
          this.block.rotateRight();
          if (this.block.checkCollision(0, 0)) {
            this.block.rotateLeft();
          }
        } else if (e.key == "ArrowRight") {
          if (!this.block.checkCollision(1, 0)) {
            this.block.moveRight();
          }
        } else if (e.key == "ArrowDown") {
          this.moveDown();
        }
      });
    },

    moveDown() {
      if (!this.block.checkCollision(0, 1)) {
        this.block.moveDown();
      } else {
        // collision
        this.block.lockOnBoard();
        this.board.removeFullRows();
        if (this.board.isGameOver(this.isBlockYNegative) && !this.gameIsOver) {
          this.gameOver();
          return;
        }
        this.block.nextBlock();
      }
    },


    startGame() {
      this.lastDropTime = Date.now();

      const fps = 30;
      setInterval(this.updateGame, 1000 / fps);
    },

    updateGame() {
      // logika gry
      // czy minęła sekunda od ostatniego przejścia klocka w dół
      if (Date.now() - this.lastDropTime > 1000) {
        this.lastDropTime = Date.now();

        this.moveDown();
      }

      this.renderCanvas();
    },
    renderCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.board.draw(this.context, this.board.squareSize);
      this.block.drawOnBoard(this.context);
    },
    isBlockYNegative() {
      return this.block.y < 0;
    },
    gameOver() {
      const scoreData = {
        game: "tetris",
        time: Date.now(),
        score: this.board.score,
      };
      this.addScore(scoreData);
      this.gameIsOver = true;
    },



  },

  beforeDestroy() {
    // czyścimy interwały
    clearInterval(this.updateGame);
  },
};
</script>

<style scoped>
#tetris-game {
  margin: 0 auto;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 33%;
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
