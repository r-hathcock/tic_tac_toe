"use strict";

// prompts user to store player selection and renders new board
function openForm() {
    const modal = document.querySelector(".modal");
    const startBtn = document.getElementById("start-game-btn");
    const chkBx = document.getElementById("plr-chk");
    const player1Entry = document.getElementById("player-one-name");
    const player2Entry = document.getElementById("player-two-name");
    var player1;
    var player2;
    
    // popup modal to retrieve book information
    modal.style.display = "block";
    player2Entry.value = "Computer";
    player2Entry.disabled = true;

    // event listener for checkbox status
    chkBx.addEventListener('change', (event) => {
        if (event.target.checked) {
            player2Entry.disabled = false;
            player2Entry.value = "";
        }
        else {
            player2Entry.value = "Computer";
            player2Entry.disabled = true;
        }
    });

    startBtn.onclick = () => {
        if (player1Entry.value != '' && player2Entry != '') {
            player1 = Player(player1Entry.value, 0);
            player2 = Player(player2Entry.value, 0);
    
            modal.style.display = "none";
            gameFlow(player1, player2, gameBoard);
        }
        else {
            alert("Enter valid names");
        }
    };
};

// controls gameflow and updates status turn by turn
function gameFlow(player1, player2, gameBoard) {
    let gameEnd = false;
    let turnNum = 1;
    const randNum = function () {
        return Math.trunc(Math.random() * 3);
    }

    // main game loop
    do {

        if (turnNum % 2 != 0) { // computer turn
            gameBoard.gameArray[randNum()][randNum()] = 'O';
            render(player1, player2, gameBoard);
            gameEnd = true;
        }
        
    } while (gameEnd === false);
};

// display contents of players and array onto document
function render(player1, player2, gameBoard) {
    const p1Element = document.querySelector(".player1-display");
    const p2Element = document.querySelector(".player2-display");
    var currentSpace;
    p1Element.innerHTML = "Player 1(X): " + player1.getName() + " - " + player1.getScore();
    p2Element.innerHTML = "Player 2(O): " + player2.getName() + " - " + player2.getScore();

    // display values of array onto gameboard
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            currentSpace = document.getElementById("space" + i + j);
            currentSpace.innerHTML = gameBoard.gameArray[i][j];
        }
    }
};

// module to store gameBoard array and related functions
const gameBoard = (() => {
    const gameArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const clearBoard = () => {

    };

    return {gameArray, clearBoard};
})();

const Player = (name, score) => {
    const getName = () => name;
    const getScore = () => score;

    return {getName, getScore};
};