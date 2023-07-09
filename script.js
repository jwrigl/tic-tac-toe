

function gameBoard() {
    //gameboard factory function
    return {
        boardData: ["", "", "", "", "", "", "", "", ""],
        resetBoardData: function () {
            this.boardData = ["", "", "", "", "", "", "", "", ""]
        },
        changeBoardData: function (index, value) {
            this.boardData[index] = value;
        }

    }
}

const board = gameBoard();

const gameLogic = (() => {
    //Not a factory function
    const winCombos = [
        [1, 2, 3], // Horizontal Rows
        [4, 5, 6],
        [7, 8, 9],
      
        [1, 4, 7], // Vertical Columns
        [2, 5, 8],
        [3, 6, 9],
      
        [1, 5, 9], // Diagonals
        [3, 5, 7]
      ];
    return {
        checkIfEmpty: function (index) {
            if (board.boardData[index] === "") {
                return true;
            }
        },
        checkIfWon: function(playerChar) {
            let occupiedIndexes = [];
            for (i=0; i<board.boardData.length; i++) {
                if (board.boardData[i] == playerChar) {
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
            return false;
        },
        checkIfDraw: function () {
            if (board.boardData.includes("")) {
                return false;
            }
        }
    }


})();

const player = (symbol) => {
    //player factory function
    return {
        playMove: function (index) {
            board.changeBoardData(index, symbol);
        }
    }
}