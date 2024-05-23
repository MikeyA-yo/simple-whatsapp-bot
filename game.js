module.exports = Game;

var winningScores = Object.create(null, {
    7: {value: true},
   56: {value: true},
  448: {value: true},
   73: {value: true},
  146: {value: true},
  292: {value: true},
  273: {value: true},
   84: {value: true}
});

function Game() {
  this.xScore = 0;
  this.oScore = 0;
  this.winner = null;
}

Game.prototype.isFinished = function() {
  return !!this.winner;
}

Game.prototype.at = function(cell) {
  return marked(cell, this.xScore) && 'X' ||
         marked(cell, this.oScore) && 'O' ||
         null;
}

Game.prototype.isValidMove = function(cell) {
  return !this.isFinished() && null == this.at(cell);
}

Game.prototype.move = function(player, cell) {
  if (!this.isValidMove(cell)) return false;
  var score = this[player.toLowerCase() + 'Score'] += (1 << (cell - 1));
  if (score in winningScores)
    this.winner = player.toUpperCase();
  else if (fullBoard(this.xScore, this.oScore))
    this.winner = 'T' // tie game
  return true;
}

Game.prototype.toString = function() {
  var cells = [], i;
  for (i = 0; i < 9; ++i)
    cells[i] = this.at(i + 1) || ' ';
  return [
    cells.slice(0, 3),
    cells.slice(3, 6),
    cells.slice(6, 9)
  ].map(function(row) {
    return row.join(' | ');
  }).join('\n--+---+--\n');
}


/**
 * Private
 */

function marked(cell, score) {
  return 1 << (cell - 1) & score;
}

function fullBoard(score1, score2) {
  return (score1 | score2) === 0x1ff;
}
