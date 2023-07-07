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
        destroyBoard
    }
};

const board = gameBoard();