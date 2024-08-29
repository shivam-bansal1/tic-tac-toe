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

    const placeToken = (token, cellNumber) => {
        for(r=0; r<rows; r++) {
            for(c=0; c<columns; c++) {
                if((board[r][c] == cellNumber) && (board[r][c] !== token)) {
                    board[r][c] = token;

                    return true;
                }
            }
        }
        return false;
    }

    return { getBoard, placeToken };
}

function GameController() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const board = GameBoard();

    const players = [
        {
            name: playerOneName,
            token: "x",
        },
        {
            name: playerTwoName,
            token: "o",
        }
    ]

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (activePlayer, cellNumber) => {
        console.log(`Placing ${activePlayer}'s token in cell number ${cellNumber}`);

        let tokenPlaced = board.placeToken(activePlayer.token, cellNumber);

        console.log(board.getBoard());
        if(tokenPlaced) {

            switchPlayer();
            return true;
        }
        else {
            console.log(`${activePlayer}'s token was not placed !!! \n Please try again`);
            return false;
        }
    };

    return { getActivePlayer,
            playRound,
            getBoard: board.getBoard 
        };
}

const game = GameController();

let activePlayer = game.getActivePlayer();
let userInput = prompt("Please enter cell number :");
userInput = parseInt(userInput);

let roundPlayed = game.playRound(activePlayer, userInput);
let count = 0;

while(count < 8) {
    activePlayer = game.getActivePlayer();
    userInput = prompt("Please enter cell number :");
    userInput = parseInt(userInput);

    let roundPlayed = game.playRound(activePlayer, userInput);
    console.log(game.getBoard());

    count++;
    console.log(count);
}
