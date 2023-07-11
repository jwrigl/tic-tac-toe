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
    //i could just put the symbols in here and have a function to alternate between them when player moves
    const parentContainer = document.querySelector('#boardContainer');
    function userClickListener() {
        let clickedCell = Number(this.id);
        console.log(gameLogic.getCurrentPlayer());
        gameLogic.getCurrentPlayer().playMove(clickedCell);
        this.innerText = gameLogic.getCurrentSymbol();
    }
    return {
        player1: player1,
        player2: player2,
        boardData: ["", "", "", "", "", "", "", "", ""],
        resetBoardData: function () {
            this.boardData = ["", "", "", "", "", "", "", "", ""]
        },
        changeBoardData: function (index, value) {
            console.log(index)
            if(value === "X" || value === "O") {
                this.boardData[index] = value;
        }
        else {
            console.log("Invalid symbol");
        }},
        buildBoard: function () {
            for (let i = 0; i < this.boardData.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            parentContainer.appendChild(cell);
            cell.innerText = this.boardData[i];

            cell.addEventListener('click', userClickListener);
        }},
        handleWin: function () {
            console.log("Player "+gameLogic.getCurrentSymbol()+" has won!");
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.removeEventListener('click', userClickListener);
            })
            const winMsgContainer = document.querySelector('#winMsgContainer');
            winMsgContainer.innerText = "Player " + gameLogic.getCurrentSymbol() + " has won!";
        }
    }
}


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
    let currentPlayerIndex = 0;
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
                    occupiedIndexes.push(i+1);
                }
            console.log(occupiedIndexes);
    
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
        getCurrentPlayer: function () { // change this to either return just the index OOORRR have it accept 2 players as inputs and return only 1 
            return currentPlayerIndex === 0 ? board.player1 : board.player2;
        },
        getCurrentSymbol: function () {
            return symbols[currentPlayerIndex];
        },
    }


})();

const player = () => {
    //player factory function
    return {
        playMove: function (index) {
            board.changeBoardData(index, gameLogic.getCurrentSymbol());
            won = gameLogic.checkIfWon(gameLogic.getCurrentSymbol());
            if (won) {
                board.handleWin();
            }
            gameLogic.checkIfDraw();
            //might need to put something here if someone wins 
            gameLogic.changePlayer();
        }
    }
}

//board instance created
const board = gameBoard(player(), player());
//board drawn and listeners started
board.buildBoard();

//pass players into start function and save them with  this.player1 = player1 in gameBoard
//board.startNewGame(player1, player2)

//remove list in currentplayerindex 
console.log(board.player1);