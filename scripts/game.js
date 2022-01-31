

let game = {
    score: 0,
    currentGame: [],
    playerMoves : [],
    choicesKeys: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
    inProgress: false,
    lastButton: "",
};

function newGame(){
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    for (let circle of document.getElementsByClassName("circle")){
        if (circle.getAttribute("data-listener") !== "true"){
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.inProgress){
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
                
            })
            circle.setAttribute("data-listener", "true");
    }
        }
        
    displayScore();
    addTurn();
}

function addTurn(){
    game.playerMoves = [];
    game.currentGame.push(game.choicesKeys[Math.floor(Math.random() * 4)]);
    showTurn(); 
}

function displayScore(){
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ){
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurn(){
    game.turnNumber = 0;
    game.inProgress = true;
    //here is used an setIntervals type function to give a time bettween the lighs on and off
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        turnNumber ++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
            game.inProgress = false;
        }
    }, 800);
}

function playerTurn(){
    //first get the last index from the payerMoves array
    let lastIndex = game.playerMoves.length - 1;
    if (game.currentGame[lastIndex] === game.playerMoves[lastIndex]){
        if (game.currentGame.length === game.playerMoves.length){
            game.score ++;
            displayScore();
            addTurn()
        }
    } else{
        alert("Wrong answer!");
        newGame();
    }
}

module.exports = { game, newGame, displayScore, addTurn, lightsOn, showTurn, playerTurn };