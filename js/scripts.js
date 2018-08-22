var players = [];
var playerTurnIndex = 0;
var finalScore = 25;

var Player = function (name, score) {
  this.name = name;
  this.score = score;
  this.turn = false;
}


var evalDice = function(input) {
  var output;
  var runningTally;
  if (input === 1) {
    output = 0;
    $('.output').append(players[playerTurnIndex].name + " rolled a '1'." + players[playerTurnIndex].name + "\'s turn is over.<br>");
  } else {
    output = input;
  }
  return output;
}

var isFinished = function(score) {
  var output;
  if (score >= finalScore) {
    output = players[playerTurnIndex].name;
    return output;
  }
}

//shows on page who's turn it is
var isTurn = function() {
  for(i=0;i<players.length;i++)
    if (players[i].turn === true) {
      $('.whoTurn').text(players[i].name);
    }
}

var switchTurn = function() {
  players[playerTurnIndex].turn = false;
  if (playerTurnIndex === players.length-1) {
    playerTurnIndex = 0;
  } else {
    playerTurnIndex += 1;
  }
  players[playerTurnIndex].turn = true;
  $('.output').append(players[playerTurnIndex].name + "\s turn.<br>");
}

var currentScore = function() {
  var currentScore = players[playerTurnIndex].score;
  return currentScore;
}

var addScore = function(inputScore) {
  players[playerTurnIndex].score += inputScore;
}

var evalScore = function() {
  $('#nameP1').text(players[0].name);
  $('#nameP2').text(players[1].name);
  $('#scoreP1').text(players[0].score);
  $('#scoreP2').text(players[1].score);
}

var playAgain = function(p1, p2) {
  $('.output').text('');
  players = [];
  var newPlayer = new Player(p1, 0);
  players.push(newPlayer);
  var newPlayer = new Player(p2, 0);
  players.push(newPlayer);
  evalScore();
  runningTally = 0;
  $('.tally').text('');
  output = 0;
  gameOver = 0;
}


var player1;
var player2;
$(document).ready(function() {
  var gameOver = 0;
  var runningTally = 0;
  var output = 0;
  //Begin Game Setup
  $('#begin').click(function() {
    player1 = $('input#player1').val();
    player2 = $('input#player2').val();
    playAgain(player1, player2);
    $('.game').show();
    $('#intro').hide();
    playerTurnIndex = Math.ceil(Math.random()*players.length)-1;
    players[playerTurnIndex].turn = true;
    $('.output').append(players[playerTurnIndex].name + "\'s turn.<br>");
    isTurn();
  });

  //Roll Dice Button
  $('#rollDice').click(function() {

    if (players[playerTurnIndex].score >= finalScore) {
      return false;
    } else {
      var roll = Math.ceil(Math.random()*6);
      output = evalDice(roll);
      if (output === 0){
        runningTally = 0;
        $('.tally').text('');
        switchTurn();
        isTurn();

      } else {
        var tempScore = runningTally + output + currentScore();
        var ending = isFinished(tempScore);
        if (ending !== undefined) {
          $('.output').append(ending + " has won with a score of " + tempScore + "<br>");
          addScore(runningTally+output);
          evalScore();
          runningTally = 0;
          gameOver = 1;

        } else {
          runningTally += output;
          $('.output').append(players[playerTurnIndex].name + " rolled a " + output + '<br>');
          $('.tally').text(runningTally);
        }
      }
    }
  });
  //Hold Dice Button - Keep Current Tally and Switch turns
  $('#holdGame').click(function() {
    if (players[playerTurnIndex].score >= finalScore) {
      return false;
    } else {
      addScore(runningTally);
      runningTally = 0;
      $('.tally').text(runningTally);
      $('.output').text('');
      switchTurn();
      isTurn();
      evalScore();
    }
  });

  $('#playAgain').click(function(){
    playAgain(player1, player2);
  });

});
