


const winningScores = [
  7,   // 000000111
  56,  // 000111000
  448, // 111000000
  73,  // 000001001 | 000010010 | 000100100
  146, // 010010010
  292, // 100100100
  273, // 100010001
  84   // 001010100
];

class Game {
  constructor() {
    this.xScore = 0;
    this.oScore = 0;
    this.winner = null;
  }

  isFinished() {
    return !!this.winner;
  }

  at(cell) {
    return (marked(cell, this.xScore) && 'X') ||
           (marked(cell, this.oScore) && 'O') ||
           null;
  }

  isValidMove(cell) {
    return !this.isFinished() && this.at(cell) === null;
  }

  move(player, cell) {
    if (!this.isValidMove(cell)) return false;
    const scoreKey = `${player.toLowerCase()}Score`;
    this[scoreKey] += (1 << (cell - 1));
    if (isWinningScore(this[scoreKey])) {
      this.winner = player.toUpperCase();
    } else if (fullBoard(this.xScore, this.oScore)) {
      this.winner = 'T'; // tie game
    }
    return true;
  }

  toString() {
    const cells = Array(9).fill(' ').map((_, i) => this.at(i + 1) || ' ');
    return [
      cells.slice(0, 3).join(' | '),
      cells.slice(3, 6).join(' | '),
      cells.slice(6, 9).join(' | ')
    ].join('\n--+---+--\n');
  }
}

/**
 * Private functions
 */

function marked(cell, score) {
  return (1 << (cell - 1)) & score;
}

function fullBoard(score1, score2) {
  return (score1 | score2) === 0x1ff;
}

function isWinningScore(score) {
  return winningScores.some(winningScore => (winningScore & score) === winningScore);
}








// const winningScores = Object.create(null, {
//   7: { value: true },
//   56: { value: true },
//   448: { value: true },
//   73: { value: true },
//   146: { value: true },
//   292: { value: true },
//   273: { value: true },
//   84: { value: true }
// });

// class Game {
//   constructor() {
//     this.xScore = 0;
//     this.oScore = 0;
//     this.winner = null;
//   }

//   isFinished() {
//     return !!this.winner;
//   }

//   at(cell) {
//     return (marked(cell, this.xScore) && 'X') ||
//            (marked(cell, this.oScore) && 'O') ||
//            null;
//   }

//   isValidMove(cell) {
//     return !this.isFinished() && this.at(cell) === null;
//   }

//   move(player, cell) {
//     if (!this.isValidMove(cell)) return false;
//     const score = this[`${player.toLowerCase()}Score`] += (1 << (cell - 1));
//     if (winningScores[score]) {
//       this.winner = player.toUpperCase();
//     } else if (fullBoard(this.xScore, this.oScore)) {
//       this.winner = 'T'; // tie game
//     }
//     return true;
//   }

//   toString() {
//     const cells = Array(9).fill(' ').map((_, i) => this.at(i + 1) || ' ');
//     return [
//       cells.slice(0, 3).join(' | '),
//       cells.slice(3, 6).join(' | '),
//       cells.slice(6, 9).join(' | ')
//     ].join('\n--+---+--\n');
//   }
// }

// /**
//  * Private functions
//  */

// function marked(cell, score) {
//   return (1 << (cell - 1)) & score;
// }

// function fullBoard(score1, score2) {
//   return (score1 | score2) === 0x1ff;
// }
module.exports = Game;