let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Human = X, Computer = O
const HUMAN = "X";
const AI = "O";

function makeMove(cell, index) {
    if (board[index] !== "" || !gameActive) return;

    // Human move
    board[index] = HUMAN;
    cell.innerText = HUMAN;

    if (checkWinner(HUMAN)) {
        endGame("You win!");
        return;
    }

    if (isDraw()) {
        endGame("Draw!");
        return;
    }

    // AI move after delay (feels natural)
    setTimeout(aiMove, 300);
}

function aiMove() {
    if (!gameActive) return;

    let bestMove = getBestMove();
    board[bestMove] = AI;

    document.querySelectorAll(".cell")[bestMove].innerText = AI;

    if (checkWinner(AI)) {
        endGame("Computer wins!");
        return;
    }

    if (isDraw()) {
        endGame("Draw!");
    }
}

function getBestMove() {
    // 1. Try winning move
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = AI;
            if (checkWinner(AI)) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 2. Block human win
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = HUMAN;
            if (checkWinner(HUMAN)) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // 3. Take center if free
    if (board[4] === "") return 4;

    // 4. Take random empty cell
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

function checkWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(i => board[i] === player);
    });
}

function isDraw() {
    return board.every(cell => cell !== "");
}

function endGame(message) {
    document.getElementById("status").innerText = message;
    gameActive = false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    document.querySelectorAll(".cell").forEach(c => c.innerText = "");
    document.getElementById("status").innerText = "";
}
