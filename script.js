/*KEY PROCESSES IN TIC TAC TOE
Player makes a move:
Is the square empty?
What symbol do they have?
Has the game been won?
Has the game been drawn?
Switch player
repeat
*/

function gameBoard(player1,player2) {
    //gameboard factory function
    //'this' refers to the window object in this function
    const parentContainer = document.querySelector('#boardContainer');
    //the function output is in this variable to take advantage of scope to pass the gameBoard object to 
    //the userclicklistener
    const gameBoardObject = {
        player1: player1,
        player2: player2,
        boardData: ["", "", "", "", "", "", "", "", ""],
        resetBoardData: function () {
            this.boardData = ["", "", "", "", "", "", "", "", ""]
        },
        changeBoardData: function (index, value) {
            this.boardData[index] = value;
        },
        buildBoard: function () {
            for (let i = 0; i < this.boardData.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            parentContainer.appendChild(cell);
            cell.innerText = this.boardData[i];

            cell.addEventListener('click', userClickListener);
        }},
        handleWin: function (symbol) {
            console.log("Player "+symbol+" has won!");
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.removeEventListener('click', userClickListener);
            })
            const winMsgContainer = document.querySelector('#winMsgContainer');
            winMsgContainer.innerText = "Player " + symbol + " has won!";
        }
    }
    const userClickListener = (e) => {
        let clickedCell = Number(e.target.id);
        if (!gameLogic.checkIfEmpty(e.target.id,board)) {
            return;
        }
        e.target.innerText = gameLogic.getCurrentSymbol(gameBoardObject);
        gameLogic.getCurrentPlayer(gameBoardObject).playMove(clickedCell,gameBoardObject);
    }
    return gameBoardObject;
}

//this should work fine and not break without global code
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
    let currentPlayerIndex = 0;
    return {
        checkIfEmpty: function (index,board) {
            if (board.boardData[index] === "") {
                console.log("empty")
                return true;
            }
            return false;
        },
        checkIfWon: function(playerChar,board) {
            let occupiedIndexes = [];
            for (i=0; i<board.boardData.length; i++) {
                if (board.boardData[i] == playerChar) {
                    occupiedIndexes.push(i+1);
                }
    
            }
            for (let i = 0; i < winCombos.length; i++) {
                const [a, b, c] = winCombos[i];
                if (occupiedIndexes.includes(a) && occupiedIndexes.includes(b) 
                    && occupiedIndexes.includes(c)) {
                    console.log("playerchar"+playerChar);
                    return true;
                }
            }
            return false;
        },
        checkIfDraw: function (board) {
            if (board.boardData.includes("")) {
                return false;
            }
        },
        changePlayer: function () {
            if (currentPlayerIndex === 1) {
                currentPlayerIndex = 0;
            }
            else {
                currentPlayerIndex = 1;
            }
        },
        getCurrentPlayer: function (board) {
            return currentPlayerIndex === 0 ? board.player1 : board.player2;
        },
        getCurrentSymbol: function (board) {
            return this.getCurrentPlayer(board).symbol;
        },
    }


})();

const player = (symbol) => {
    //player factory function
    return {
        symbol: symbol,
        playMove: function (index,board) {
            console.log("player symbol: "+symbol);
            console.log("still running")
            board.changeBoardData(index, symbol);
            let won = gameLogic.checkIfWon(symbol,board);
            if (won) {
                board.handleWin(symbol);
            }
            gameLogic.checkIfDraw(board);
            //might need to put something here if someone wins 
            gameLogic.changePlayer();
        }
    }
}

//board instance created
const player1 = player("X");
const player2 = player("O");
const board = gameBoard(player1, player2);
//board drawn and listeners started
board.buildBoard();

//pass players into start function and save them with  this.player1 = player1 in gameBoard
//board.startNewGame(player1, player2)

//remove list in currentplayerindex 
