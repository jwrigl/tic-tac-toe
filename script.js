const player = () => {
    //player factory function
}

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


const gameLogic = () => {
    //Not a factory function

}