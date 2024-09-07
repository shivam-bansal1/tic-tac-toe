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
    const gameBoard = Gameboard();

    console.log(gameBoard.getBoard());

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

    const getWinner = (token) => {
        let board = gameBoard.getBoard();
        // Rows
        if((board[0] === board[1] && board[1] === board[2] && board[0] == token) || 
            (board[3] === board[4] && board[4] === board[5] && board[3] == token) ||
            (board[6] === board[7] && board[7] === board[8] && board[6] == token)) 
            return true;

        // Columns
        else if ((board[0] === board[3] && board[3] === board[6] && board[0] == token) || 
                (board[1] === board[4] && board[4] === board[6] && board[1] == token) ||
                (board[2] === board[5] && board[5] === board[7] && board[2] == token)) 
            return true;

        // Diagonal
        else if ((board[0] === board[4] && board[4] === board[8] && board[0] == token)) 
            return true;

        // Anti-Diagonal
        else if ((board[2] === board[4] && board[4] === board[6] && board[2] == token)) 
            return true;

        else 
            return false;
    }
    return {
        getActivePlayer,
        getBoard: gameBoard.getBoard,
        switchActivePlayer,
        placeToken: gameBoard.placeToken,
        getWinner
    }
}

const game = GameController();

let activePlayer = game.getActivePlayer()
console.log(`activePlayer: ${activePlayer.name}`);

game.placeToken(activePlayer.token, 0);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 2);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 8);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 6);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 5);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 4);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));

activePlayer = game.switchActivePlayer();
game.placeToken(activePlayer.token, 7);
console.log(game.getBoard());
console.log(game.getWinner(activePlayer.token));
console.log(activePlayer.token);
console.log(typeof activePlayer.token);

