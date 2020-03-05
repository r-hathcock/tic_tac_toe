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

                    render(player1, player2, gameBoard);
                    gameBoard.checkWinCondition(gameBoard.gameArray);
                    computerTurn();
                }
            }
        })
    };
    
    // vs PLAYER 2
    if (computerOpponent === false) { 
        render(player1, player2, gameBoard);
        let selection = 'X';
        player1.currentTurn = true;

        document.body.addEventListener('click', function(e) {
            if (e.target.className == 'board-space') {
                if (e.target.innerHTML == '') {
                    let index1 = e.target.dataset.index1;
                    let index2 = e.target.dataset.index2;
                    gameBoard.gameArray[index1][index2] = selection; // player select

                    if (selection == 'X') {
                        selection = 'O';
                        player2.currentTurn = true;
                        player1.currentTurn = false;
                    }
                    else {
                        selection = 'X';
                        player2.currentTurn = false;
                        player1.currentTurn = true;
                    }
                        

                    render(player1, player2, gameBoard);
                    gameBoard.checkWinCondition(gameBoard.gameArray);
                }
            }
        });
    };

    const computerTurn = () => {
        computerSelected = false;
                    
        while (computerSelected === false) {
            gameBoard.checkWinCondition(gameBoard.gameArray);
            rand1 = randomSpace();
            rand2 = randomSpace();

            if (gameBoard.gameArray[rand1][rand2] === '') {
                gameBoard.gameArray[rand1][rand2] = 'O';
                computerSelected = true;
            }
        }
        render(player1, player2, gameBoard);
        gameBoard.checkWinCondition(gameBoard.gameArray);
    };
}

// display contents of players and array onto document
function render(player1, player2, gameBoard) {
    const p1Element = document.querySelector(".player1-display");
    const p2Element = document.querySelector(".player2-display");
    var currentSpace;
    p1Element.innerHTML = "X - " + player1.getName();
    p2Element.innerHTML = "O - " + player2.getName();

    if (player1.currentTurn === true) {
        p1Element.style.color = red;
    } else 
    p2Element.Style.color = black;

    if (player2.currentTurn === true) {
        p2Element.style.color = red;
    } else 
        p2Element.Style.color = black;

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
        var xSum, oSum, blankSum = 0;
        // check rows
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
                    if (confirm("X wins!")) {
                        location.reload();
                    }
                    else 
                        location.reload();
                    break;
                }
                if (oSum === 3) {
                    if (confirm("O wins!")) {
                        location.reload();
                    }
                    else 
                        location.reload();
                    break;
                }
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            xSum = 0;
            oSum = 0;
            for (let j = 0; j < 3; j++) {
                if (gameArray[j][i] === 'X') {
                    xSum++;
                } 
                if (gameArray[j][i] === 'O') {
                    oSum++;
                }
                if (xSum === 3) {
                    if (confirm("X wins!")) {
                        location.reload();
                    }
                    else 
                        location.reload();
                    break;
                }
                if (oSum === 3) {
                    if (confirm("O wins!")) {
                        location.reload();
                    }
                    else 
                        location.reload();
                    break;
                }
            }
        }
        // All three cells traversing the board diagonally are the same.
        // left to right
        xSum = 0;
        oSum = 0;
        for (let i = 0; i < 3; i++) {
            if (gameArray[i][i] === 'X') {
                xSum++;
            }
            if (gameArray[i][i] === 'O') {
                oSum++;
            }
            if (xSum === 3) {
                if (confirm("X wins!")) {
                    location.reload();
                }
                else 
                    location.reload();
                break;
            }
            if (oSum === 3) {
                if (confirm("O wins!")) {
                    location.reload();
                }
                else 
                    location.reload();
                break;
            }
        }
        // right to left
        xSum = 0;
        oSum = 0;
        for (let i = 2, j = 0; i > -1; i--, j++) {
            if (gameArray[j][i] === 'X') {
                xSum++;
            }
            if (gameArray[j][i] === 'O') {
                oSum++;
            }
            if (xSum === 3) {
                if (confirm("X wins!")) {
                    location.reload();
                }
                else 
                    location.reload();
                break;
            }
            if (oSum === 3) {
                if (confirm("O wins!")) {
                    location.reload();
                }
                else 
                    location.reload();
                    break;
            }
        }
        // check for tie game
        blankSum = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameArray[i][j] === '') {
                    blankSum++;
                }
            }
        }
        if (blankSum === 0) {
            if (confirm("Tie Game!")) {
                location.reload();
            }
            else 
                location.reload();
        }
    };
    

    return {gameArray, checkWinCondition};
})()

const Player = (name, score, turn) => {
    const getName = () => name;
    const getScore = () => score;
    const currentTurn = () => turn;

    return {getName, getScore, currentTurn};
}