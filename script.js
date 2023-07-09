const gameBoard = () => {
    let boardData = [
        '', '', '',
        '', '', '',
        '', '', ''
      ];

    const getBoardData = () => {
        return boardData;
    }
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
        const {playMove} = gameRules();
        const parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < boardData.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            parentContainer.appendChild(cell);
            cell.innerText = boardData[i];

            cell.addEventListener('click', () => {
                const clickedCell = cell.id;
                const {currentPlayer, playMove} = player();
                {currentPlayer === 'X' ? playMove(clickedCell, 'X') : playMove(clickedCell, 'O')}

                
                
            })
        }

    }
    const destroyBoard = () => {
        parentContainer = document.querySelector('#boardContainer');
        for (let i = 0; i < boardData.length; i++) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
    }

    const populatecell = (index, playerChar) => {
        //maybe cut this down to just one line
        boardData[index] = playerChar;
        destroyBoard();
        buildBoard();
    }


    const populateList = (index,symbol) => {
        boardData[index] = symbol;
        
    }
    return {
        getBoardData,
        resetBoardData,
        buildBoard,
        destroyBoard,
        populatecell,
        populateList
    }
};

//replace with a static class / enum
const gameRules = () => {
    const winCombos = (
        (1, 2, 3), (4, 5, 6), (7, 8, 9),  //Rows
        (1, 4, 7), (2, 5, 8), (3, 6, 9),  //Columns
        (1, 5, 9), (3, 5, 7)              //Diagonals
    )
    const {getBoardData} = gameBoard();

    const checkIfWon = (playerChar) => {
        boardData = getBoardData();
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
        boardData = getBoardData();
        if (boardData[id] == '') {
            return true;
        }
        return false;
    }

    const checkIfDraw = () => {
        boardData = getBoardData();
        for (let i = 0; i < boardData.length; i++) {
            checkIfEmpty(i);
    }
    }

    let currentPlayer = "X";

    const switchPlayer = () => {
        if (currentPlayer == "X") {
            currentPlayer = "O";
            return currentPlayer;
        } else {
            currentPlayer = "X";
            return currentPlayer;
        }
    }

    return {
        checkIfWon,
        checkIfDraw,
        checkIfEmpty,
        switchPlayer
    }
}

//am i making multiple instances of gameBoard?
const player = (name, symbol, board) => {


    const playMove = (id,symbol,board) => {
        //move into gameRules as this insn't a player exclusive action 
        //try move function
        if (checkIfEmpty(id, board)) {
            populateList()
            populatecell(id, symbol);
            checkIfWon(symbol);
            checkIfDraw();
        }
        else {
            console.log("Selected cell is already occupied");
        }
    }

    return {
        playMove,
        name,
        symbol
    }
}

const board = gameBoard();
const rules = gameRules();

board.buildBoard() //listeners now running

const player1 = player('Player 1', 'X', board);
const player2 = player('Player 2', 'O', board);
