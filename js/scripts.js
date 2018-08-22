var playerTurnIndex = 0;
var players = [];
var board = ['0','1','2','3','4','5','6','7','8',];
var game = ['-','-','-','-','-','-','-','-','-',];
var winningArrs = [
  ['M','M','M','-','-','-','-','-','-',],
  ['-','-','-','M','M','M','-','-','-',],
  ['-','-','-','-','-','-','M','M','M',],
  ['M','-','-','M','-','-','M','-','-',],
  ['-','M','-','-','M','-','-','M','-',],
  ['-','-','M','-','-','M','-','-','M',],
  ['M','-','-','-','M','-','-','M','-',],
  ['-','-','M','-','M','-','M','-','-',],
];

var Player = function (name, symbol, turn) {
  this.name = name;
  this.symbol = symbol;
  this.turn = turn;
  this.grid = ['-','-','-','-','-','-','-','-','-','-'];
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

var winningArrs = function () {

  for(i=0;i<winningArrs.length-1;i++) {

  }
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

$(document).ready(function() {
  var player1 = $('#player1').val();
  var player2 = $('#player2').val();

  var newPlayer = new Player("Player 1", 'X', true);
  players.push(newPlayer);
  var newPlayer = new Player("Player 2", 'O', false);
  players.push(newPlayer);

  $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
  $('.tSquare').click(function() {
    $(this).text(players[playerTurnIndex].symbol);
    game[parseInt($(this).attr('id'))] = "M";
    players[playerTurnIndex].grid[parseInt($(this).attr('id'))] = players[playerTurnIndex].symbol;
    if (checkWin()) {
      $('.winner').text(players[playerTurnIndex].name + " is the winner");
    } else {
      switchTurn();
      $('.pTurn').text(players[playerTurnIndex].name + " - " + players[playerTurnIndex].symbol)
    }
  });

});
