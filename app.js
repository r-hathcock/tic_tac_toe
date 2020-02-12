"use strict";

// prompts user to store player selection and renders new board
function openForm() {
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector(".close-btn");
    const startBtn = document.getElementById("start-game-btn");
    const chkBx = document.getElementById("plr-chk");
    const player1Entry = document.getElementById("player-one-name");
    const player2Entry = document.getElementById("player-two-name");
    var player1;
    var player2;
    
    // popup modal to retrieve book information
    modal.style.display = "block";
    

    
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
        player1 = Player(player1Entry.value);
        player2 = Player(player2Entry.value);

        modal.style.display = "none";
        render(player1, player2);
    };

    modalCloseBtn.onclick = () => {
        modal.style.display = "none";
    };
};

function render(player1, player2) {
    const p1Element = document.querySelector(".player1-display");
    const p2Element = document.querySelector(".player2-display");

    p1Element.innerHTML = "Player 1: " + player1.getName();
    p2Element.innerHTML = "Player 2: " + player2.getName();
};
// module to store gameBoard array and related functions
const gameBoard = (() => {
    const gameArray = [
        ["x", "o", "o"],
        ["x", "o", "x"],
        ["o", "x", "o"]
    ];

    const testing = () => {
        console.log("test");
    };
    const clearBoard = () => {

    };

    return {gameArray, testing, clearBoard};
})();

const Player = (name, score) => {
    const getName = () => name;

    return {getName};
};