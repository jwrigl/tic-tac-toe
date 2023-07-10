/*KEY PROCESSES IN TIC TAC TOE
Player makes a move:
Is the square empty?
What symbol do they have?
Has the game been won?
Has the game been drawn?
Switch player
repeat
*/

function gameBoard() {
    //gameboard factory function
    //i could just put the symbols in here and have a function to alternate between them when player moves
    return {
        boardData: ["", "", "", "", "", "", "", "", ""],
        resetBoardData: function () {
            this.boardData = ["", "", "", "", "", "", "", "", ""]
        },
        changeBoardData: function (index, value) {
            this.boardData[index] = value;
        },
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
      const symbols = ["X", "O"];
      const currentPlayerIndex = [0]
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
        },
        changePlayer: function () {
            currentPlayerIndex = (currentPlayerIndex + 1) % symbols.length;
        },
        getCurrentPlayer: function () {
            return symbols[currentPlayerIndex];
        }
    }


})();

const player = (symbol) => {
    //player factory function
    return {
        playMove: function () {
            let index = prompt("Pick a square");
            board.changeBoardData(index, symbol);
            gameLogic.checkIfWon(symbol);
            gameLogic.checkIfDraw();
            //might need to put something here if someone wins 
            gameLogic.changePlayer();
        }
    }
}

player1 = player("X");
player2 = player("O");

while (gameLogic.checkIfDraw() === false && gameLogic.checkIfWon(player1) === false && gameLogic.checkIfWon(player2) === false) {
    player1.playMove();
    player2.playMove();
    player1.playMove();
    player2.playMove();
    player1.playMove();
    player2.playMove();
    player1.playMove();
    player2.playMove();
    player1.playMove();
    player2.playMove()
}
console.log("a player has won");