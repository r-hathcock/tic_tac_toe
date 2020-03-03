"use strict";

// prompts user to store player selection and renders new board
function openForm() {
    const modal = document.querySelector(".modal");
    const startBtn = document.getElementById("start-game-btn");
    const chkBx = document.getElementById("plr-chk");
    const player1Entry = document.getElementById("player-one-name");
    const player2Entry = document.getElementById("player-two-name");
    let player1, player2, computerOpponent = true;
    
    
    // popup modal to retrieve book information
    modal.style.display = "block";
    player2Entry.value = "Computer";
    player2Entry.disabled = true;

    // event listener for checkbox status
    chkBx.addEventListener('change', (event) => {
        if (event.target.checked) {
            player2Entry.disabled = false;
            player2Entry.value = "";
            computerOpponent = false;
        }
        else {
            player2Entry.value = "Computer";
            player2Entry.disabled = true;
            computerOpponent = true;
        }
    })

    startBtn.onclick = () => {
        if (player1Entry.value != '' && player2Entry != '') {
            player1 = Player(player1Entry.value, 0);
            player2 = Player(player2Entry.value, 0);
    
            modal.style.display = "none";
            game(player1, player2, gameBoard, computerOpponent);
        }
        else {
            alert("Enter valid names");
        }
    }
}

// controls gameflow and updates status turn by turn
function game(player1, player2, gameBoard, computerOpponent) {
   // let gameEnd = false;
    let turnNum = 1;
    let rand1, rand2, computerSelected;
    const randomSpace = () => {
        return Math.trunc(Math.random() * 3);
    };

    // vs COMPUTER
    if (computerOpponent === true) { 
        render(player1, player2, gameBoard);

        document.body.addEventListener('click', function(e) {
            if (e.target.className == 'board-space') {
                if (e.target.innerHTML == '') {
                    let index1 = e.target.dataset.index1;
                    let index2 = e.target.dataset.index2;
                    gameBoard.gameArray[index1][index2] = 'X'; // player select

                    computerTurn();
                    render(player1, player2, gameBoard);
                    gameBoard.checkWinCondition(gameBoard.gameArray);
                }
            }
        })
    };
    
    // vs PLAYER 2
    if (computerOpponent === false) { 
        render(player1, player2, gameBoard);
        let selection = 'X';

        document.body.addEventListener('click', function(e) {
            if (e.target.className == 'board-space') {
                if (e.target.innerHTML == '') {
                    let index1 = e.target.dataset.index1;
                    let index2 = e.target.dataset.index2;
                    gameBoard.gameArray[index1][index2] = selection; // player select

                    if (selection == 'X') 
                        selection = 'O';
                    else
                        selection = 'X';

                    render(player1, player2, gameBoard);
                    gameBoard.checkWinCondition(gameBoard.gameArray);
                }
            }
        });
    };

    const computerTurn = () => {
        computerSelected = false;
                    
        while (computerSelected === false) {
            rand1 = randomSpace();
            rand2 = randomSpace();

            if (gameBoard.gameArray[rand1][rand2] === '') {
                gameBoard.gameArray[rand1][rand2] = 'O';
                computerSelected = true;
            }
        }
    };
}

// display contents of players and array onto document
function render(player1, player2, gameBoard) {
    const p1Element = document.querySelector(".player1-display");
    const p2Element = document.querySelector(".player2-display");
    var currentSpace;
    p1Element.innerHTML = "X - " + player1.getName();
    p2Element.innerHTML = "O - " + player2.getName();

    // display values of array onto gameboard
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            currentSpace = document.getElementById("space" + i + j);
            currentSpace.innerHTML = gameBoard.gameArray[i][j];
        }
    }
}

// module to store gameBoard array and related functions
const gameBoard = (() => {
    const gameArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const checkWinCondition = (gameArray) => {
        
        var xSum, oSum;
        // All three cells in any row are the same
        for (let i = 0; i < 3; i++) {
            xSum = 0;
            oSum = 0;
            for (let j = 0; j < 3; j++) {
                if (gameArray[i][j] === 'X') {
                    xSum++;
                } 
                if (gameArray[i][j] === 'O') {
                    oSum++;
                }

                if (xSum === 3) {
                    alert("X wins!");
                    break;
                }
                if (oSum === 3) {
                    alert("O wins!");
                    break;
                }
            }
        }

        // All three cells in any column are the same

        // All three cells traversing the board diagonally are the same.

        
        
        console.log(gameArray);
    };
    return {gameArray, checkWinCondition};
})()

const Player = (name, score) => {
    const getName = () => name;
    const getScore = () => score;

    return {getName, getScore};
}