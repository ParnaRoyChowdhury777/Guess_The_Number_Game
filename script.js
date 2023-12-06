let go = document.getElementById("go");
let home = document.getElementById("home");
let game = document.getElementById("game");

var roundsSelect = document.getElementById("rounds");
var maxRoundElement = document.getElementById("max_round");

// Function to update max_round based on the selected value
function updateMaxRound() {
  // Clear existing content
  maxRoundElement.innerHTML = '';

  // Update max_round based on the selected value
  if (roundsSelect.value === '3') {
      maxRoundElement.innerHTML = '10';
  } else if (roundsSelect.value === '5') {
      maxRoundElement.innerHTML = '50';
  } else {
      maxRoundElement.innerHTML = '100';
  }
}

// Add event listener for the "change" event on the select element
roundsSelect.addEventListener("change", function() {
  updateMaxRound();
});

// Call updateMaxRound directly to ensure max_round initialization on page load
updateMaxRound();

go.addEventListener("click", () => {
    home.style.display = "none";
    game.style.display = "block"; 
});

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

var guessesTaken = 0;
var gameDone = 0;
var correctGuess = 0;

var neWGame = function() { 
  var lbl = document.getElementById('try_guess');
  lbl.value = null;
  guessesTaken = 0;
  input_area.innerHTML = "";
  home.style.display = "block";
  game.style.display = "none"; 
  correctGuess = generateRandomNumber();
  gameDone = 0;
};

// Function to generate a random number based on maxRoundElement
function generateRandomNumber() {
  return Math.floor(Math.random() * Number.parseInt(maxRoundElement.innerText)) + 1;
}

// Call neWGame directly to ensure game initialization on page load
neWGame();


var response = function(txtGuess) {
  var answer;

  while (guessesTaken < Number.parseInt(roundsSelect.value) && gameDone == 0) {
      if (txtGuess == correctGuess) {
          answer = "Correct! ";
          break;
      } else if (txtGuess < correctGuess && txtGuess > 0) {
          answer = "Too Lower, Enter a higher number ";
      } else if (txtGuess > correctGuess && txtGuess < (Number.parseInt(maxRoundElement.innerText) + 1)) {
          answer = "Too Higher, Enter a lower number ";
      } else {
          answer = "Enter a number, ";
          // Remove the return statement here
          return answer;
      }

      guessesTaken = guessesTaken + 1;
      return answer;
      
  }
  return answer;

  // Move the return statement here, outside the while loop
};



var btnSubmit = document.getElementById('submit');
btnSubmit.onclick = function(e) {
    var txtGuess = document.getElementById('try_guess').value;
    var answer = response(txtGuess);
    var remainingMessage = (Number.parseInt(roundsSelect.value) - guessesTaken).toString() + " guess(es) remain"; 
    var lbl = document.getElementById('input_area');
    if (gameDone == 0) {
        if (answer == "Correct! ") {
            lbl.innerHTML += "<p> Congratulations!! You Won and scored " + (100 - guessesTaken) + " points. Play again? </p>";
            gameDone = 1;
        } else if (guessesTaken == Number.parseInt(roundsSelect.value)) {
            lbl.innerHTML += "<p> Correct answer was " + correctGuess + ". You lost. New game? </p>";
            gameDone = 1;
        } else {
            lbl.innerHTML += "<span id='response'>" + txtGuess + "</span> " + answer + remainingMessage + "<br />";
        }
    }
    var txtGuess = document.getElementById('try_guess');
    txtGuess.value = null;
    return false;
};

// Update newGame button to call neWGame
var newGameButton = document.getElementById('newGame');
newGameButton.onclick = neWGame;
neWGame();
