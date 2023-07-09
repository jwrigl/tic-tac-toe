

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
    return {
        checkIfEmpty: function (index) {
            if (board.boardData[index] === "") {
                return true;
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