class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Boom! GAME OVER');
      this._board.print();
    } else if(!this._board.hasSafeTiles()) {
      console.log('HURRAH! YOU HAVE WON!');
      this._board.print();
    } else {
      console.log('\nCurrent Board:\n');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighbourBombs(rowIndex, columnIndex) {
    const neighbourOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighbourOffsets.forEach(offset => {
      const neighbourRowIndex = offset[0] + rowIndex;
      const neighbourColumnIndex = offset[1] + columnIndex;
      if (neighbourRowIndex >= 0 && neighbourRowIndex <= numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex <= numberOfColumns) {
        if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
            numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return (this._numberOfTiles !== this._numberOfBombs);
  }

  print() {
    console.log('\nPLAYER BOARD:\n');
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    console.log('\nBOMB BOARD:\n');
    console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex<numberOfColumns; colIndex++) {
        row.push(' ');
      } // End of col for loop
      board.push(row);
    } // end of row loop
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex<numberOfRows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex<numberOfColumns; colIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    };
    return board;
  }

}

const g = new Game(5,5,5);
g.playMove(2,4);
