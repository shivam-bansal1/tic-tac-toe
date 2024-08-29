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

    const getWinner = (player) => {
        const gameSymbol = player.token;
        const renderedGameBoard = board.getBoard();

        // Horizontally
        let c = 0;
        for(let r=0; r<3; r++) {
            if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r][c+1] === gameSymbol) && (renderedGameBoard[r][c+2] === gameSymbol)) {
                return true;
            }
        }

        // Vertically 
        let r = 0;
        for(let c=0; c<3; c++) {
            if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c] === gameSymbol) && (renderedGameBoard[r+2][c] === gameSymbol)) {
                return true;
            }
        }

        // Diagonal
        c = 0;
        r = 0;
        if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c+1] === gameSymbol) && (renderedGameBoard[r+2][c+2] === gameSymbol)) {
            return true;
        }

        // Anti-Diagonal
        c = 2;
        r = 0;
        if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c-1] === gameSymbol) && (renderedGameBoard[r+2][c-2] === gameSymbol)) {
            return true;
        }

        return false;
    }

    const playRound = (activePlayer, cellNumber) => {
        console.log(`Placing ${activePlayer.name}'s token in cell number ${cellNumber}`);

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
            getBoard: board.getBoard ,
            getWinner
        };
}

const game = GameController();
let count = 0;

while(count < 9) {
    let activePlayer = game.getActivePlayer();
    console.log(`active player: ${activePlayer.name}`);
    let userInput = prompt("Please enter cell number(0-8) :");
    userInput = parseInt(userInput);

    let roundPlayed = game.playRound(activePlayer, userInput);

    count++;
    console.log(count);

    const winner = game.getWinner(activePlayer);
    if(winner===true) {
        console.log(`${activePlayer.name} with symbol '${activePlayer.token}' won the game.`);
        break;
    }
}

if(count !== 9) {
    console.log(`It's a tie.`);
}
