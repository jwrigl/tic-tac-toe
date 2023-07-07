const gameBoard = () => {
    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
      ];
    function newBoard() {
        board = [
            '', '', '',
            '', '', '',
            '', '', ''
          ];
    }
    function buildBoard(board) {
        parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < board.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            parentContainer.appendChild(cell);
            cell.innerText = board[i];
        }

    }
    function destroyBoard(board) {

    }
};