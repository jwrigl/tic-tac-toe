const player = () => {
    //player factory function
}

function gameBoard() {
    //gameboard factory function
    return {
        boardData: ["", "", "", "", "", "", "", "", ""],
        resetBoardData: function () {
            this.boardData = ["", "", "", "", "", "", "", "", ""];
        }

    }
}


const gameLogic = () => {
    //Not a factory function

}