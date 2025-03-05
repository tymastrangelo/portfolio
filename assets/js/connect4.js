var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // Clear any previous board elements

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardDiv.append(tile);
        }
        board.push(row);
    }

    // Reset UI elements
    document.getElementById("winner").style.opacity = "0";
    let playAgainBtn = document.getElementById("playAgain");
    playAgainBtn.style.opacity = "0";
    playAgainBtn.style.pointerEvents = "none";
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    let tile = document.getElementById(`${r}-${c}`);
    if (currPlayer === playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();
}

function checkWinner() { 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c] && board[r][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c + 1] && board[r][c] === board[r + 2][c + 2] && board[r][c] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] === playerRed) {
        winner.innerText = "🔥 Red Player Wins!";
    } else {
        winner.innerText = "💛 Yellow Player Wins!";
    }

    winner.style.opacity = "1";
    gameOver = true;

    setTimeout(() => {
        let playAgainBtn = document.getElementById("playAgain");
        playAgainBtn.style.opacity = "1";
        playAgainBtn.style.pointerEvents = "auto";
    }, 500);
}

function resetGame() {
    gameOver = false;
    currPlayer = playerRed;
    setGame(); // Fully resets board and UI
}