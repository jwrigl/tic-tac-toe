function gameBoard(player1,player2) {
    //gameboard factory function
    //'this' refers to the window object in this function

    //the function output is in this variable to take advantage of scope to pass the gameBoard object to 
    //the userclicklistener
    const removeEventListeners = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.removeEventListener('click', userClickListener);
        })
    }
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
        buildBoard: function (playerName) {
            const headerContainer = document.createElement('div');
            headerContainer.id = 'headerContainer';
            document.body.appendChild(headerContainer);

            const playerNameDisplay = document.createElement('div');
            playerNameDisplay.id = 'playerNameDisplay';
            playerNameDisplay.innerText = playerName;
            headerContainer.appendChild(playerNameDisplay);

            const parentContainer = document.createElement('div');
            parentContainer.id = 'boardContainer';
            document.body.appendChild(parentContainer);

            for (let i = 0; i < this.boardData.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;

            parentContainer.appendChild(cell);
            cell.innerText = this.boardData[i];

            cell.addEventListener('click', userClickListener);
        }},
        handleWin: function (symbol) {
            removeEventListeners();
            const winMsgContainer = document.querySelector('#winMsgContainer');
            winMsgContainer.innerText = "Player " + symbol + " has won!";
        },
        handleDraw: function () {
            removeEventListeners();
            const winMsgContainer = document.querySelector('#winMsgContainer');
            winMsgContainer.innerText = "It's a draw!";
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
            else {
                return true;
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
            let draw = gameLogic.checkIfDraw(board);
            if (draw) {
                board.handleDraw();
            }
            //might need to put something here if someone wins 
            gameLogic.changePlayer();
        }
    }
}

const landingPage = (() => {
    return {
        buildLandingPage: function () {
            const landingPageContainer = document.createElement('div');
            landingPageContainer.id = 'landingPageContainer';
            document.body.appendChild(landingPageContainer);

            const landingPage = document.createElement('div');
            landingPage.id = ('landingPage');
            landingPageContainer.appendChild(landingPage);
            
            const landingPageTitle = document.createElement('div');
            landingPageTitle.id = 'landingPageTitle';
            landingPageTitle.innerText = "Tic Tac Toe";
            landingPage.appendChild(landingPageTitle);

            const nameInput = document.createElement('input');
            nameInput.id = 'nameInput';
            landingPage.appendChild(nameInput);

            const startButton = document.createElement('button');
            startButton.id = 'startButton';
            startButton.innerText = 'Start';
            startButton.onclick = this.loadGame;
            landingPage.appendChild(startButton);
        },
        loadGame: function () {
            const playerName = document.getElementById('nameInput').value;
            document.body.removeChild(document.getElementById('landingPageContainer'));
            board.buildBoard(playerName);

        }
    }
})();


//board instance created
function initialize() {
    const player1 = player("X");
    const player2 = player("O");
    //board drawn and listeners started
    return gameBoard(player1, player2);
};
const board = initialize();
landingPage.buildLandingPage();


//pass players into start function and save them with  this.player1 = player1 in gameBoard
//board.startNewGame(player1, player2)

//remove list in currentplayerindex 
