export default class Board {
  board = null;
  NUM_ROWS = null;
  NUM_COLS = null;
  DEFAULT = 'gray';
  GRID_COLOR = 'black';
  score = 0;

  constructor({ width, height, squareSize }) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.getElementById('tetris-game').appendChild(canvas);
    this.context = canvas.getContext('2d');

    // increase canvas size to 500px if it's less than 500px
    if (width < 300) {
      canvas.width = 300;
      this.width = 300;
    } else {
      this.width = width;
    }
    if (height < 500) {
      canvas.height = 500;
      this.height = 500;
    } else {
      this.height = height;
    }

    this.NUM_ROWS = Math.floor(this.height / squareSize);
    this.squareSize = squareSize;
    this.NUM_COLS = Math.floor(this.width / squareSize);

    this.board = [];

    for (let i = 0; i < this.NUM_ROWS; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.NUM_COLS; j++) {
        this.board[i][j] = this.DEFAULT;
      }
    }
  }

  draw = () => {
    // draw grid
    this.context.lineWidth = 10;
    this.context.strokeStyle = this.GRID_COLOR;
    for (let i = 0; i < this.NUM_ROWS; i++) {
      this.context.beginPath();
      this.context.moveTo(0, i * this.squareSize);
      this.context.lineTo(this.width, i * this.squareSize);
      this.context.stroke();
    }
    for (let i = 0; i < this.NUM_COLS; i++) {
      this.context.beginPath();
      this.context.moveTo(i * this.squareSize, 0);
      this.context.lineTo(i * this.squareSize, this.height);
      this.context.stroke();
    }

    // draw squares
    for (let i = 0; i < this.NUM_ROWS; i++) {
      for (let j = 0; j < this.NUM_COLS; j++) {
        this.drawBoardSquare(i, j, this.board[i][j]);
      }
    }

    this.drawText('Punkty: ' + this.score, 5, 20, 'black', '16px Verdana');
  };

  drawBoardSquare = (rowIndex, colIndex, color) => {
    this.context.fillStyle = color;
    this.context.fillRect(
      colIndex * this.squareSize,
      rowIndex * this.squareSize,
      this.squareSize,
      this.squareSize
    );
  };

  drawText = (text, x, y, color, font) => {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.fillText(text, x, y);
  };

  lockBoardSquare = (rowIndex, colIndex, color) => {
    if (rowIndex >= this.board.length || rowIndex < 0) return;
    if (colIndex >= this.board[rowIndex].length || colIndex < 0) return;

    this.board[rowIndex][colIndex] = color;
  };

  checkSquareCollision = (x, y) => {
    if (x < 0 || x >= this.NUM_COLS || y >= this.NUM_ROWS) {
      return true;
    }

    if (y < 0) return false;

    if (this.board[y][x] == this.DEFAULT) {
      return false;
    } else {
      return true;
    }
  };

  removeFullRows = () => {
    let newScore = 0;
    let numFullRows = 0;

    for (let r = 0; r < this.NUM_ROWS; r++) {
      let isFullRow = true;
      const columns = this.board[r];
      for (let c = 0; c < this.NUM_COLS; c++) {
        if (this.board[r][c] == this.DEFAULT) {
          isFullRow = false;
        }
      }

      if (isFullRow) {
        numFullRows++;

        for (let y = r; y > 1; y--) {
          for (let x = 0; x < this.NUM_COLS; x++) {
            this.board[y][x] = this.board[y - 1][x];
          }
          for (let x = 0; x < this.NUM_COLS; x++) {
            this.board[0][x] = this.DEFAULT;
          }

          newScore += 1;
        }
      }

      this.score += newScore * numFullRows;
    }
  };
}
