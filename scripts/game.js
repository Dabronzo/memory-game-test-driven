

let game = {
    score: 0,
    currentGame: [],
    playerMoves : [],
    choicesKeys: ["button1", "button2", "button3", "button4"],
};

function newGame(){
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];

    displayScore(game.score);
}

function displayScore(){
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, displayScore };