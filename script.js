/*
Optimized Version - 1. Using Array() to make gameboard instead of 2-D matrix
*/

function Gameboard() {
    // Create game board
    let board = Array(9).fill("");

    // Return game board
    const getBoard = () => board;

    // Clear the board
    const clearBoard = () => {
        board = Array(9).fill("");
    }
    
    const placeToken = (token, cellNumber) => {
        if(board[cellNumber] === "") {
            board[cellNumber] = token;
            return true;
        }
        return false;
    }

    return { getBoard, placeToken, clearBoard };
}

function GameController() {
    const gameBoard = Gameboard();

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
                (board[1] === board[4] && board[4] === board[7] && board[1] == token) ||
                (board[2] === board[5] && board[5] === board[8] && board[2] == token)) 
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

    let tokensPlaced = 0;
    const getNumberOfTokensPlaced = () => tokensPlaced;

    // Reset game for new round
    const resetGame = () => {
        tokensPlaced = 0;
        activePlayer = players[0];
        gameBoard.clearBoard();
    }

    const playRound = (cellNumber) => {
        const playerToken = activePlayer.token;
        const playerName = activePlayer.name;

        const tokenPlaced = gameBoard.placeToken(playerToken, cellNumber);
        if(tokenPlaced) {
            tokensPlaced++;
            const winner = getWinner(playerToken);
            if(winner) {
                return true;
            }
            switchActivePlayer();
        }
        else 
            console.log(`Not able to place ${playerName}'s token`);

        return false;
    }

    return {
        getActivePlayer,
        getBoard: gameBoard.getBoard,
        switchActivePlayer,
        playRound,
        getNumberOfTokensPlaced,
        resetGame
    }
}


function ScreenController() {
    const game = GameController();
    const gameBoardDiv = document.querySelector(".game-board");
    const playeTurnDiv = document.querySelector(".player-turn");
    
    function updateScreen() {
        // Clear the board before updating
        gameBoardDiv.textContent = "";
        
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playeTurnDiv.textContent = `${activePlayer.name}'s Turn....`;

        board.forEach((cell, cellNumber) => {
            // Create button to proivde clickable space
            const cellDiv = document.createElement("button");
            cellDiv.classList.add("board-cell")
            cellDiv.dataset.column = cellNumber;
            cellDiv.textContent = cell;

            // Append cell in game board
            gameBoardDiv.appendChild(cellDiv);
        });
    }

    // Place token when cell is clicked
    gameBoardDiv.addEventListener('click', (event) => {
        const clickedCell = event.target.dataset.column;
        const tokensPlaced = game.getNumberOfTokensPlaced();
        console.log(tokensPlaced);
        const player = game.getActivePlayer();
        if(!clickedCell)
            return ;

        const roundResult = game.playRound(clickedCell);
        updateScreen();
        
        if(roundResult || tokensPlaced===8) {
            // Show result
            playeTurnDiv.textContent = "Game Over!!!";
            const resultDiv = document.querySelector(".result");
            if(roundResult)
                resultDiv.textContent = `${player.name} has won!!!!`;
            else
                resultDiv.textContent = `Game Tied!!!`;

            // Make cells click disabled
            gameBoardDiv.style.pointerEvents = 'none';

            // New game button
            const newGameButton = document.createElement("button");
            newGameButton.textContent = "Play Again";
            newGameButton.classList.add("new-game-button");
            document.querySelector(".container").appendChild(newGameButton);

            newGameButton.addEventListener('click', ()=> {
                // Reset game
                game.resetGame();
                // Enable click on board for further rounds
                gameBoardDiv.style.pointerEvents = 'auto';
                // Remove new game button and update screen to default
                gameBoardDiv.style.pointerEvents = 'auto';

                document.querySelector(".container").removeChild(newGameButton);
                resultDiv.textContent = "";

                updateScreen();
            });
        }
    });


    updateScreen();
}

ScreenController();