<template>
  <div id="tetris-game">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Block from "../../components/tetris/Block.js";
import Board from "../../components/tetris/Board.js";

export default {
  name: "Tetris",

  data() {
    return {
      board: null,
      block: null,
      lastDropTime: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
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
        // kolizja
        this.block.lockOnBoard();
        this.board.removeFullRows();
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
</style>
