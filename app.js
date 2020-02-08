"use strict";

// prompts user to store player selection and renders new board
const startGame = () => {
    // popup modal to retrieve book information
    let modal = document.querySelector(".modal");
    let modalCloseBtn = document.querySelector(".close-btn");
    
    modal.style.display = "block";


    modalCloseBtn.onclick = () => {
        modal.style.display = "none";
    };
};

// module to store gameBoard array and related functions
const gameBoard = (() => {
    const gameArray = [
        ["1", "2", "3"],
        ["", "", ""],
        ["", "", ""]
    ];

    const testing = () => {
        console.log("test");
    };
    const clearBoard = () => {

    };

    return {gameArray, testing, clearBoard};
})();

const createPlayer = (name) => {
    const getName = () => name;

    return {getName};
};