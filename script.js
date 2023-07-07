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

    const checkIfDraw = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == '') {
                return false;
            }
        }
        return true;
    }

    const checkIfWon = () => {
        return;
    }

    return {
        newBoard,
        buildBoard,
        destroyBoard
        checkIfWon,
        checkIfDraw
    }
};

const board = gameBoard();