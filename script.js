let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
// 👇 New Feature 1: Turn & Score elements
let turnInfo = document.querySelector("#turn-info");

let turnO = true; // true for 'O', false for 'X'
let count = 0; //to track draw

// New Feature 1: Score tracking
let scoreO = 0;
let scoreX = 0;

const players = {
  O: "Player 1 (O)",
  X: "Player 2 (X)",
};
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Helper function to update the displayed turn/score
const updateDisplay = () => {
  turnInfo.innerHTML = `O Score: **${scoreO}** | X Score: **${scoreX}** | Next: **${
    turnO ? "O" : "X"
  }**`;
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  // setTimeout(() =>{
  //   msgContainer.classList.add("hide");
  // },300)
  msgContainer.classList.add("hide");
  // New Feature 3: Remove win highlight
  boxes.forEach((box) => box.classList.remove("win-highlight"));
  updateDisplay();
};

const hardReset = () => {
  scoreO = 0;
  scoreX = 0;
  resetGame();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const currentSymbol = turnO ? "O" : "X";

    box.innerText = currentSymbol;
    turnO = !turnO; // Toggle turn
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    updateDisplay(); // Update display after every move
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winnerSymbol) => {
  const winnerName = players[winnerSymbol];
  msg.innerText = `Winner is ${winnerName}! Congratulations`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // New Feature 1: Update score
    if (winnerSymbol === "O") {
        scoreO++;
    } else {
        scoreX++;
    }

    // New Feature 3: Highlight the winning boxes
    winningPattern.forEach(index => {
        boxes[index].classList.add("win-highlight");
    });
    updateDisplay();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // [paconsole.log([pattern[0]],[pattern[1]],[pattern[2]]);
    // console.log(boxesttern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        showWinner(pos1Val, pattern); // Pass the winning pattern 
        return true;
      }
    }
  }
  return false;
};
// Start the game display on load
updateDisplay();
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", hardReset);
