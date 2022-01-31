
/**
 * @jest-environment jsdom
 */

const {game, newGame, displayScore, addTurn, lightsOn, showTurn} = require("../game");

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
    test("turnNumber exists", () => {
        expect("turnNumber" in game).toBe(true);
    })
});

//here the function newGame() will be tested and was estipulated that this game will do
//reset the score to zero
//clear the playerMoves
//clear the currentGame
//However the newGame will also call other two functions: showScore() and addTurn()
//showScore display the score at the dom
//add turn is called in the newGame and will add one random button to the currentGame[]

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
    //test to check if the currentGame has the first move after the newGame() is called
    test("currentGame array should have lenght 1", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("score should display 0", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    })
    //testing if all the buttons got an eventListener on them
    test("data-listener attribute should be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements){
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    })

});

//bellow are the test for the gamePlay

describe("gameplay working correctly", () => {
    //the before each will be used to mock some data for each test in theis case
    //to simulate interactivity

    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    })
    //since that we need to run test indemendelty we need to state an after each to reset the addTurn function changes

    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    })

    //test to see if addTurn is adding at the game array
    //for that the addTurn will be called again
    test("there are two elements on the currentGame array", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    })

    //here is the test for the lightOn class being added to the elements on the currentGame array
    test("the class lightsOn exists in the element on currentGame", () => {
        let button = document.getElementById(game.currentGame[0])
        //the function to lightsOn() is called
        //passing the element on the array
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    //here is the part to test the showTurn()
    //this function should
    //run thru the currentGame array and aply light on each
    test("showTurns() should update the game.turnNumber", () => {
        game.turnNumber = 42;
        showTurn();
        expect(game.turnNumber).toBe(0);
    })
})


