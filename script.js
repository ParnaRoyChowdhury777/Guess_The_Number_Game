let go = document.getElementById("go");
let home = document.getElementById("home");
let game = document.getElementById("game");

go.addEventListener("click", () => {
    document.getElementById("game_start_audio").play();
    home.style.display = "none";
    game.style.display = "block"; 
});

var correctGuess = 0;
var guessesTaken = 0;
var gameDone = 0;

var neWGame = function() { 
  var lbl = document.getElementById('try_guess');
  lbl.value = null;
  guessesTaken = 0;
  input_area.innerHTML = "";
  home.style.display = "block";
  game.style.display = "none"; 
  document.getElementById("rounds").value = null
};

correctGuess = Math.floor(Math.random() * 100) + 1;

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
    
    while (guessesTaken < Number.parseInt(document.getElementById("rounds").value) && gameDone == 0) {
      if (txtGuess == correctGuess) {
        answer = "Congratulations, you scored" + (100 - guessesTaken) + "points";
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
  var remainingMessage = (Number.parseInt(document.getElementById("rounds").value) - guessesTaken).toString() + " guess(es) remain"; 
  var input_area = document.getElementById('input_area');
  if (gameDone == 0) {
    if (answer == "Correct! ") {
      input_area.innerHTML += answer + "<p> Play again </p>";
      gameDone = 1;
    } else if (guessesTaken == Number.parseInt(document.getElementById("rounds").value)) {
      input_area.innerHTML += "<span id='response'>" + txtGuess + "</span>" + answer + remainingMessage + "<br />" + "<p> You lost. Correct number was " + correctGuess + "<br> New game? </p>";
      gameDone = 1;
      
    } else {
      input_area.innerHTML += "<span id='response'> " + txtGuess + " </span>" + answer + remainingMessage + "<br />";
    }
  }
  var txtGuess = document.getElementById('try_guess');
  txtGuess.value = null;
  return false;
};







