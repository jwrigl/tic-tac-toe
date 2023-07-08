const gameBoard = () => {
    let boardData = [
        '', '', '',
        '', '', '',
        '', '', ''
      ];
    const resetBoardData = () => {
        boardData = [
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
        for (let i = 0; i < boardData.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            parentContainer.appendChild(cell);
            cell.innerText = boardData[i];
        }

    }
    const destroyBoard = () => {
        parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < boardData.length; i++) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
    }

    const populatecell = (index, playerChar) => {
        boardData[index] = playerChar;
        destroyBoard();
        buildBoard();

        
    }
    return {
        resetBoardData,
        buildBoard,
        destroyBoard,
        populatecell,
        boardData
    }
};

const board = gameBoard();

const gameRules = () => {
    const winCombos = (
        (1, 2, 3), (4, 5, 6), (7, 8, 9),  //Rows
        (1, 4, 7), (2, 5, 8), (3, 6, 9),  //Columns
        (1, 5, 9), (3, 5, 7)              //Diagonals
    )
    const {boardData} = gameBoard();

    const checkIfWon = (playerChar) => {
        let occupiedIndexes = [];
        for (i=0; i<boardData.length; i++) {
            if (boardData[i] == playerChar) {
                occupiedIndexes.push(i);
            }

        }
        for (let i = 0; i < winCombos.length; i++) {
            const [a, b, c] = winCombos[i];
            if (occupiedIndexes.includes(a) && occupiedIndexes.includes(b) 
                && occupiedIndexes.includes(c)) {

                return true;
            }
        }
        return;
    }

    const checkIfEmpty = (id) => {
        if (boardData[id] == '') {
            return true;
        }
        return false;
    }

    const checkIfDraw = () => {
        for (let i = 0; i < board.length; i++) {
            checkIfEmpty(i);
    }
    }

    return {
        checkIfWon,
        checkIfDraw,
        checkIfEmpty
    }
}
