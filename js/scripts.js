//initial global variables
var game = [];
var playerTurnIndex = 0;
var players = [];
var gameOver = 0;


var gameSetup = function() {//setup game with new players and a new gameboard, clear fields out
  players = [];
  var newPlayer = new Player("Player 1", 'X', true);
  players.push(newPlayer);
  var newPlayer = new Player("Player 2", 'O', false);
  players.push(newPlayer);
  $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
  game = ['Z','Z','Z','Z','Z','Z','Z','Z','Z'];
  playerTurnIndex = 0;
  // for(i=0;i<8;i++) {
    $('.tSquare').text('');
}

// var winningArrs = [
//   ['M','M','M','-','-','-','-','-','-'],
//   ['-','-','-','M','M','M','-','-','-'],
//   ['-','-','-','-','-','-','M','M','M'],
//   ['M','-','-','M','-','-','M','-','-'],
//   ['-','M','-','-','M','-','-','M','-'],
//   ['-','-','M','-','-','M','-','-','M'],
//   ['M','-','-','-','M','-','-','-','M'],
//   ['-','-','M','-','M','-','M','-','-']
// ];



var winningArray = [
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
  if (playerTurnIndex === 0) { //set variable to search for X or O
    var turns = (players[playerTurnIndex].grid.join('').match(/x/gi)||[]).length;
  } else {
    var turns = (players[playerTurnIndex].grid.join('').match(/o/gi)||[]).length;
  }
  var index = 0;
  var output = '';
  for(i = 0;i<turns;i++) { //create a output string that is the indexes of the player.grid
    index = players[playerTurnIndex].grid.join('').indexOf(players[playerTurnIndex].symbol,index);
    output += index;
    index ++;
  }
  playerArr = output.split('');
  for(i=0;i<winningArray.length;i++) { //see if the current player.grid is a one of the winning arrays
    if (playerArr.includes(winningArray[i][0]) && playerArr.includes(winningArray[i][1]) && playerArr.includes(winningArray[i][2])) {
      return true;
    }
  }
}

var isTied = function() { // check to see if any Z's are left in the game array
  var spacesRemaining = game.join('').match(/z/gi)||[].length;
  if (spacesRemaining === 0) {
    return true;
  }
}


var Player = function (name, symbol, turn) {// player objects with name, symbol, isTurn, and grid
  this.name = name;
  this.symbol = symbol;
  this.turn = turn;
  this.grid = ['-','-','-','-','-','-','-','-','-'];
}

var resetGame = function() { //reset the game and call the initial setup to play again
  gameOver = 0
  players = [];
  gameSetup();
  $('.winner').hide();
}


var switchTurn = function() {//sets first turn to player[0] OR alternates to next player in player[]
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



$(document).ready(function() {
  gameSetup();
  $('.tSquare').click(function() {//when user clicks on any of the 9 squares on the grid
    if (gameOver === 0) {
      if (game[parseInt($(this).attr('id'))] === "Z") {
        $(this).text(players[playerTurnIndex].symbol);
        game[parseInt($(this).attr('id'))] = players[playerTurnIndex].symbol;
        players[playerTurnIndex].grid[parseInt($(this).attr('id'))] = players[playerTurnIndex].symbol;
        if (findWin()) {//check to see if the last move was a winning move
          $('.winner').text(players[playerTurnIndex].name + " is the winner");
          $('.winner').show();
          gameOver = 1;
        } else if (isTied()) {//check to see if any empty spaces are left, otherwise TIE game
          gameOver = 1;
          $('.winner').text("There is no winner. Click the Reset button to play again.");
          $('.winner').show();
        } else {//switch the turn to the next player
          switchTurn();
          $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
        }
      } else {//user clicked on a square that the game board that is not empty (has a Z)
        alert("Choose a square that hasn't been taken");
      }
    } else {//Game is over and clicking on grid will disable function
      alert("Game is over.");
    }
  });
  $('#reset').click(function() {//reset game and will call the gameSetup()
    resetGame();
  });
});
