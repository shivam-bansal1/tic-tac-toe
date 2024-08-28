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

    const getBoard = () => board ;

    return { getBoard };
}

const board = GameBoard();
console.log(board.getBoard());