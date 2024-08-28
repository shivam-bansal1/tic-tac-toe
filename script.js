function GameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;
    let cellNumber = 0;

    for(let r=0; r<rows; r++) {
        board[r] = [];

        for(let c=0; c<columns; c++) {
            board[r][c] = cellNumber++;
        }
    }

    // Method to render whole board
    const getBoard = () => board ;

    return { getBoard };
}

function GameController() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const board = GameBoard();

    const players = [
        {
            player: playerOneName,
            token: "x",
        },
        {
            player: playerTwoName,
            token: "o",
        }
    ]

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    return { switchPlayer, getActivePlayer};
}

const game = GameController();
console.log(game.getActivePlayer());

game.switchPlayer();

console.log(game.getActivePlayer());