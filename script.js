function GameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    let clearBoard = () => {
        for(let r=0; r<rows; r++) {
            board[r] = [];
    
            for(let c=0; c<columns; c++) {
                board[r][c] = " ";
            }
        }
    };

    const placeToken = (player, cellNumber) => {
        let cellValue = 0;
        for(let r=0; r<rows; r++) {
            for(let c=0; c<columns; c++) {
                if(cellValue == cellNumber && board[r][c] == " ") {
                    board[r][c] = player.token;
                    return true;
                }
                cellValue++;
            }
        }
        return false;
    }

    // Method to render whole board
    const getBoard = () => board ;

    // Make an empty board for starting
    clearBoard();

    return { getBoard, placeToken , clearBoard };
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
        document.querySelector('.player-turn').textContent = `${activePlayer.name}'s turn`;
    }

    const getActivePlayer = () => activePlayer;

    const getWinner = () => {
        const gameSymbol = activePlayer.token;
        const renderedGameBoard = board.getBoard();

        // Horizontally
        let c = 0;
        for(let r=0; r<3; r++) {
            if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r][c+1] === gameSymbol) && 
                (renderedGameBoard[r][c+2] === gameSymbol)) {
                activePlayer = players[0];
                return true;
            }
        }

        // Vertically 
        let r = 0;
        for(let c=0; c<3; c++) {
            if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c] === gameSymbol) && 
                (renderedGameBoard[r+2][c] === gameSymbol)) {
                activePlayer = players[0];
                return true;
            }
        }

        // Diagonal
        c = 0;
        r = 0;
        if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c+1] === gameSymbol) && 
            (renderedGameBoard[r+2][c+2] === gameSymbol)) {
            activePlayer = players[0];
            return true;
        }

        // Anti-Diagonal
        c = 2;
        r = 0;
        if((renderedGameBoard[r][c] === gameSymbol) && (renderedGameBoard[r+1][c-1] === gameSymbol) && 
            (renderedGameBoard[r+2][c-2] === gameSymbol)) {
            activePlayer = players[0];
            return true;
        }

        return false;
    }

    const playRound = (cellNumber) => {
        console.log(`Placing ${activePlayer.name}'s token in cell number ${cellNumber}`);

        let tokenPlaced = board.placeToken(activePlayer, cellNumber);
        if(tokenPlaced) {
            const gotAnyWinner = getWinner();
            if (gotAnyWinner) {
                console.log(`${activePlayer.name} has won the game`);
                document.querySelector('.result').textContent = `${activePlayer.name} has won the game !!!!`;

                return true;
            }
            switchPlayer();
        }
        else {
            console.log(`${activePlayer.name}'s token was not placed !!! \n Please try again`);
        }

        return false
    };

    return { getActivePlayer,
            playRound,
            getBoard: board.getBoard,
            clearBoard: board.clearBoard
        };
}

function ScreenController() {
    const game = GameController();
    const boardDiv = document.querySelector(".game-board");
    const playerTurnDiv = document.querySelector(".player-turn");
    
    const updateScreen = () => {
        // Clear the game board
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        let cellNumber = 0;
        playerTurnDiv.textContent = `${activePlayer.name}'s turn....`;

        // Render board squares
        board.forEach((row) => {
            row.forEach((cell) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("board-cell");
                cellButton.dataset.column = cellNumber;
                cellNumber++;

                cellButton.textContent = cell
                boardDiv.appendChild(cellButton);
            }); 
        });
    };

    boardDiv.addEventListener('click', (event) => {
        const selectedCell = event.target.dataset.column;
        console.log(selectedCell);

        // Cell is not selected
        if (!selectedCell) return;

        const gotWinner = game.playRound(selectedCell);
        updateScreen();

        if(gotWinner) {
            document.querySelector('.player-turn').innerHTML = "Game Over";

            // New Game Button
            const containerDiv = document.querySelector('.container');
            const newGameButton = document.createElement("button");
            newGameButton.textContent = "Play Again!";
            newGameButton.classList.add("new-game-button");
            containerDiv.appendChild(newGameButton);

            // Disable click on board after result of round    
            document.querySelector('.game-board').style.pointerEvents = 'none';

            document.querySelector(".new-game-button").addEventListener('click', () => {
                game.clearBoard();

                // Enable click on board for further rounds
                document.querySelector('.game-board').style.pointerEvents = 'auto';
                // Remove play again button
                document.querySelector(".new-game-button").remove();

                updateScreen();
            });
        }
    });


    // For intial rendering
    updateScreen();
}

ScreenController();