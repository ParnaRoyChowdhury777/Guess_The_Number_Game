var correctGuess = 0;
var guessesTaken = 0;
var maxGuesses = document.getElementById("rounds").value;
var gameDone = 0;

var neWGame = function() { 
  var lbl = document.getElementById('try_guess');
  lbl.innerHTML = " ";
  guessesTaken = 0;
  correctGuess = Math.floor((Math.random() * 100)+1);
};

neWGame();

var newgame = document.getElementById('newGame');
newgame.onclick = neWGame;

let on = document.querySelector('#bgm-play');
let off = document.querySelector('#bgm-mute');
let audio = document.querySelector('#bgm_audio');

on.onclick = off.onclick = function() {
    audio.paused ? music_play() : music_stop();
}

function music_play() {
    audio.play();
    on.style.display = "block";
    off.style.display = "none";
}

function music_stop() {
  audio.pause();
  on.style.display = "none";
  off.style.display = "block";
  audio.currentTime = 0;
}


var response = function(txtGuess) {
    var answer;
    
    while (guessesTaken < maxGuesses && gameDone == 0) {
      if (txtGuess == correctGuess) {
        answer = "Congratulations, you scored $(100 - guessesTaken) points ";
      } else if (txtGuess < correctGuess && txtGuess > 0) {
        answer = "Too less, try a bigger value ";
      } else if (txtGuess > correctGuess && txtGuess < 101) {
        answer = "Too big, try a smaller value ";
      } else {
        answer = "Enter a number, ";
        return answer; /*exit loop to prevent increasing guessesTaken*/
      }
      
      guessesTaken += 1;
      return answer;
    }
    
    return "New game?";
  };


  var btnSubmit = document.getElementById('submit');
  btnSubmit.onclick = function(e) {
  var txtGuess = document.getElementById('try_guess').value;
  var answer = response(txtGuess);
  var remainingMessage = (maxGuesses - guessesTaken).toString() + " guess(es) remain"; 
  var lbl = document.getElementById('input_area');
  if (gameDone == 0) {
    if (answer == "Correct! ") {
      lbl.innerHTML += answer + "<p> Play again </p>";
      gameDone = 1;
    } else if (guessesTaken == maxGuesses) {
      lbl.innerHTML += "<p> You lost. Correct number was " + correctGuess + "<br> New game? </p>";
      gameDone = 1;
    } else {
      lbl.innerHTML += "<span id='response'>" + txtGuess + "</span>" + answer + remainingMessage + "<br />";
    }
  }
  var txtGuess = document.getElementById('guess');
  txtGuess.value = null;
  return false;
};


let go = document.getElementById("go");
let home = document.getElementById("home");
let game = document.getElementById("game");

go.addEventListener("click", () => {
    document.getElementById("game_start_audio").play();
    home.style.display = "none";
    game.style.display = "block";
});



