const wordGrid = document.querySelector(".word-grid");

const wordsUl = document.querySelector(".words");

const gridSize = 10;

const wordList = ["LIFE", "TREE", "STORY"];

let letterGrid = Array.from({ length: gridSize }, () =>
  Array(gridSize).fill("")
);

console.log(letterGrid);

let isSelecting = false;
let selectedCells = [];

function handleMouseDown(e) {
  isSelecting = true;
  selectedCells = [e.target];
  e.target.classList.add("selected");
}

function handleMouseOver(e) {
  if (isSelecting && !selectedCells.includes(e.target)) {
    selectedCells.push(e.target);
    e.target.classList.add("selected");
  }
}

function handleMouseUp() {
  if (!isSelecting) return;

  const selectedWord = selectedCells
    .map((cell) => cell.textContent)
    .join("")
    .toUpperCase();
  checkSelectedWord(selectedWord);

  // Clear selection state
  selectedCells.forEach((cell) => cell.classList.remove("selected"));
  selectedCells = [];
  isSelecting = false;
}

function checkSelectedWord(word) {
  if (wordList.includes(word)) {
    selectedCells.forEach((cell) => {
      const newLetter = generateRandomText();
      cell.textContent = newLetter;
      letterGrid[cell.dataset.row][cell.dataset.col] = newLetter;
      cell.classList.add("refilled");
    });

    const items = wordsUl.querySelectorAll("li");
    items.forEach((li) => {
      if (li.textContent === word) {
        li.classList.add("found");
      }
    });

    wordList.splice(wordList.indexOf(word), 1);
  }
}

function createGrid() {
  wordGrid.innerHTML = "";
  console.log(letterGrid);

  placeWordsInGrid();

  fillGridWithRandomLetters();
  console.log(letterGrid);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = letterGrid[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("mousedown", handleMouseDown);
      cell.addEventListener("mouseover", handleMouseOver);
      cell.addEventListener("mouseup", handleMouseUp);

      wordGrid.appendChild(cell);
    }
  }
}

function placeWordsInGrid() {
  wordList.forEach((word) => {
    let placed = false;
    while (!placed) {
      let row = Math.floor(Math.random() * gridSize);
      let startCol = Math.floor(Math.random() * (gridSize - word.length + 1));
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        let currentLetter = letterGrid[row][startCol + i];
        if (currentLetter !== "" && currentLetter !== word[i]) {
          canPlace = false;
          break;
        }
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            letterGrid[row][startCol + i] = word[i];
          }
          placed = true;
        }
      }
    }
    const li = document.createElement("li");
    li.textContent = word;
    wordsUl.appendChild(li);
  });
}

function fillGridWithRandomLetters() {
  for (let row = 0; row < gridSize; row++) {
    for (let cols = 0; cols < gridSize; cols++) {
      if (letterGrid[row][cols] === "") {
        letterGrid[row][cols] = generateRandomText();
      }
    }
  }
}

function generateRandomText() {
  const alphabet = "abcdefgijklmnopqrstuvwxyz";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

createGrid();
