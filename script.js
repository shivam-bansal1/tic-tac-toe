/*
Optimized Version - 1. Using Array() to make gameboard instead of 2-D matrix
*/

function Gameboard() {
    // Create game board
    const board = Array(9).fill("");

    // Return game board
    const getBoard = () => board;

    return { getBoard };
}

function GameController() {
    const board = Gameboard();

    console.log(board.getBoard());

    const players = [
        {
            name: "Player One",
            token: "x"
        },
        {
            name: "Player Two",
            token: "o"
        }
    ]

    const activePlayer = players[0];

    const getActivePlayer = () => activePlayer ;
    const switchActivePlayer = () => activePlayer === players[0] ? players[1] : players[0];

    return {
        getActivePlayer,
        getBoard: board.getBoard,
        switchActivePlayer,
    }
}

const game = GameController();
let activePlayer = game.getActivePlayer()
console.log(`activePlayer: ${activePlayer.name}`);
activePlayer = game.switchActivePlayer();
console.log(`activePlayer: ${activePlayer.name}`);
