var players = [];
var board = ['0','1','2','3','4','5','6','7','8','9'];
var game = ['1','0','0','0','0','0','0','0','0','0'];
var playerTurnIndex = 0;
var finalScore = 25;

var Player = function (name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.turn = false;
  this.grid = [];
}

var checkWin = function () {
  if ((game[1] === game[2] === game[3]) || (game[4] === game[5] === game[6]) || (game[7] === game[8] === game[9]) || (game[1] === game[5] === game[9]) || (game[3] === game[5] === game[7]) || (game[1] === game[4] === game[7]) || (game[3] === game[6] === game[9])) {
    return true;
  } else {
  return false
  }

game.includes(players.symbol)
}



$(document).ready(function() {
  var player1 = $('#player1').val();
  var player2 = $('#player2').val();

  var newPlayer = new Player("Joe", 'X');
  players.push(newPlayer);
  var newPlayer = new Player("Bob", 'O');
  players.push(newPlayer);
  $('#begin').click(function() {
  });

  $('.tSquare').click(function() {
    $(this).text(players[0].symbol);

  });

});
