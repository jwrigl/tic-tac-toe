const gameBoard = () => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
      ];
    const newBoard = () => {
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
          ];
        cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
        }
    }
    const buildBoard = () => {
        parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < board.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            parentContainer.appendChild(cell);
            cell.innerText = board[i];
        }

    }
    const destroyBoard = () => {
        parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < board.length; i++) {
            parentContainer.removeChild(board[i]);
        }

    }

    return {
        newBoard,
        buildBoard,
        destroyBoard,
        checkIfWon,
        checkIfDraw
    }
};

const board = gameBoard();

const gameRules = () => {
    const winCombos = (
        (1, 2, 3), (4, 5, 6), (7, 8, 9),  //Rows
        (1, 4, 7), (2, 5, 8), (3, 6, 9),  //Columns
        (1, 5, 9), (3, 5, 7)              //Diagonals
    )
    const checkIfWon = () => {
        return;
    }
    const checkIfDraw = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                return false;
            }
        }
        return true;
    }

    return {
        winCombos,
        checkIfWon,
        checkIfDraw
    }
}
