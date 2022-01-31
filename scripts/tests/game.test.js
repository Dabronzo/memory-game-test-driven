
/**
 * @jest-environment jsdom
 */

const {game, newGame, displayScore} = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContent = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContent);
    document.close();

})

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame exist", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves exists", () => {
        expect("playerMoves" in game). toBe(true);
    });
    test("choicesKeys", () => {
        expect("choicesKeys" in game).toBe(true)
    });
    test("expect correct buttons of choicesKeys", () => {
        expect(game.choicesKeys).toEqual(["button1", "button2", "button3", "button4"]);
    })
});

//here the function newGame() will be tested and was estipulated that this game will do
//reset the score to zero
//clear the playerMoves
//clear the currentGame
//However the newGame will also call other two functions: showScore() and displayNewGame()
//showScore display the score at the dom


describe("newGame is reseting/cleaning the properties of the game", () => {
    //first a beforeAll is used to simulate some data to be reseted by the function
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button2", "button1", "button4", "button3"];
        game.currentGame = ["button2", "button1", "button4", "button3"];
        //mocking a DOM content to test
        document.getElementById("score").innerText = "42";
        newGame();
    });

    test("score is reseted", () => {
        expect(game.score).toEqual(0);
    });
    test("playerMoves array is clean", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("curretnGame array is clean", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("score should display 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    })

});