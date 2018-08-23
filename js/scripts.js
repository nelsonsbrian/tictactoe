var game = [];
var board = [];
var playerTurnIndex = 0;
var players = [];

var gameSetup = function() {
  players = [];
  var newPlayer = new Player("Player 1", 'X', true);
  players.push(newPlayer);
  var newPlayer = new Player("Player 2", 'O', false);
  players.push(newPlayer);
  $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
  board = ['0','1','2','3','4','5','6','7','8'];
  game = ['Z','Z','Z','Z','Z','Z','Z','Z','Z'];
  playerTurnIndex = 0;
  // for(i=0;i<8;i++) {
    $('.tSquare').text('');
}

var winningArrs = [
  ['M','M','M','-','-','-','-','-','-'],
  ['-','-','-','M','M','M','-','-','-'],
  ['-','-','-','-','-','-','M','M','M'],
  ['M','-','-','M','-','-','M','-','-'],
  ['-','M','-','-','M','-','-','M','-'],
  ['-','-','M','-','-','M','-','-','M'],
  ['M','-','-','-','M','-','-','-','M'],
  ['-','-','M','-','M','-','M','-','-']
];



var otherWin = [
  ['0','1','2'],
  ['3','4','5'],
  ['6','7','8'],
  ['0','3','6'],
  ['1','4','7'],
  ['2','5','8'],
  ['0','4','8'],
  ['2','4','6']
];


//Returns all the string of indexes of the players moves
var findWin = function() {
  if (playerTurnIndex === 0) {
    var turns = (players[playerTurnIndex].grid.join('').match(/x/gi)||[]).length;
  } else {
    var turns = (players[playerTurnIndex].grid.join('').match(/o/gi)||[]).length;
  }
  var index = 0;
  var output = '';
  for(i = 0;i<turns;i++) {
    index = players[playerTurnIndex].grid.join('').indexOf(players[playerTurnIndex].symbol,index);
    output += index;
    index ++;
  }
  playerArr = output.split('');
  for(i=0;i<otherWin.length;i++) {
    if (playerArr.includes(otherWin[i][0]) && playerArr.includes(otherWin[i][1]) && playerArr.includes(otherWin[i][2])) {

      return true;
    }
  }
}

var isTied = function() {
  var spacesRemaining = game.join('').match(/z/gi)||[].length;
  if (spacesRemaining === 0) {
    return true;
  }
}


var Player = function (name, symbol, turn) {
  this.name = name;
  this.symbol = symbol;
  this.turn = turn;
  this.grid = ['-','-','-','-','-','-','-','-','-'];
}

var checkWin = function () {
  if (
    false
  ) {
  return true;
  } else {
  return false;
  }
}

var resetGame = function() {
  gameOver = 0
  players = [];
  gameSetup();
  $('.winner').hide();
}


var switchTurn = function() {
  if (players[playerTurnIndex].turn = true) {
    players[playerTurnIndex].turn = false;
    if (playerTurnIndex === players.length-1) {
      playerTurnIndex = 0;
    } else {
      playerTurnIndex += 1;
    }
    players[playerTurnIndex].turn = true;
  } else {
    players[playerTurnIndex].turn = true;
  }
}


var gameOver = 0;
$(document).ready(function() {
  gameSetup();
  $('.tSquare').click(function() {
    if (gameOver === 0) {
      if (game[parseInt($(this).attr('id'))] === "Z") {
        $(this).text(players[playerTurnIndex].symbol);
        game[parseInt($(this).attr('id'))] = players[playerTurnIndex].symbol;
        players[playerTurnIndex].grid[parseInt($(this).attr('id'))] = players[playerTurnIndex].symbol;
        if (findWin()) {
          $('.winner').text(players[playerTurnIndex].name + " is the winner");
          $('.winner').show();
          gameOver = 1;
        } else if (isTied()) {
          gameOver = 1;
          $('.winner').text("There is no winner. Click the Reset button to play again.");
          $('.winner').show();
        } else {
          switchTurn();
          $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
        }
      } else {
        alert("Choose a square that hasn't been taken");
      }
    } else {
      alert("Game is over.");
    }
  });
  $('#reset').click(function() {
    resetGame();
  });
});
