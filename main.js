const board = document.querySelector(".board");
const cells = Array(9).fill(undefined); // Initialize with undefined
let currentPlayer = "x";

// Handle cell click
const handleCellClick = (e) => {
  const cellIndex = e.target.dataset.index;
  if (cells[cellIndex]) return; // Ignore if already filled
  updateCell(cellIndex);
};

// Update cell after a valid click
const updateCell = (index) => {
  cells[index] = currentPlayer;

  const cellElement = document.querySelector(`[data-index="${index}"]`);
  cellElement.classList.add(`player-${currentPlayer}`);
  cellElement.textContent = currentPlayer.toUpperCase();

  const winner = checkWinner();
  const isDraw = !cells.includes(undefined);

  if (winner || isDraw) {
    if (winner) {
      // Update score
      const scoreEl = document.getElementById(`player-${winner}-score`);
      scoreEl.textContent = Number(scoreEl.textContent) + 1;

      alertbox.render({
        alertIcon: "success",
        title: "Winner",
        message: `Player ${winner.toUpperCase()} is the winner!`,
        btnTitle: "Ok",
      });
    } else {
      alertbox.render({
        alertIcon: "info",
        title: "Draw",
        message: "No one is the winner. It's a draw!",
        btnTitle: "Ok",
      });
    }
    resetGame();
  } else {
    // Switch player
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  }
};

// Check for a winner
const checkWinner = () => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of combos) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a]; // Return winner symbol
    }
  }

  return null;
};

// Reset the board
const resetGame = () => {
  cells.fill(undefined);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("player-x", "player-o");
  });
};

// Create board cells dynamically
const createBoard = () => {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cell.classList.add("cell");
    cell.addEventListener("click", handleCellClick);
    board.append(cell);
  }
};

// Initialize the game
createBoard();
