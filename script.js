/*
Optimized Version - 1. Using Array() to make gameboard instead of 2-D matrix
*/

function Gameboard() {
    // Create game board
    const board = Array(9).fill("");

    // Return game board
    const getBoard = () => board;
    
    const placeToken = (token, cellNumber) => {
        if(board[cellNumber] === "") {
            board[cellNumber] = token;
            return true;
        }
        return true;
    }

    return { getBoard, 
            placeToken };
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

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer ;
    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    return {
        getActivePlayer,
        getBoard: board.getBoard,
        switchActivePlayer,
        placeToken: board.placeToken,
    }
}

const game = GameController();

let activePlayer = game.getActivePlayer()
console.log(`activePlayer: ${activePlayer.name}`);

game.placeToken(activePlayer.token, 2);
console.log(game.getBoard());

activePlayer = game.switchActivePlayer();
console.log(`activePlayer: ${game.getActivePlayer().name}`);

game.placeToken(activePlayer.token, 0);
console.log(game.getBoard());

