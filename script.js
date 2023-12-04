let go = document.getElementById("go");
let home = document.getElementById("home");
let game = document.getElementById("game");

go.addEventListener("click", () => {
    document.getElementById("game_start_audio").play();
    home.style.display = "none";
    game.style.display = "block";   
});

