const wordGrid = document.querySelector(".word-grid");

const wordsUl = document.querySelector(".words");

const gridSize = 10 * 10;

let wordList = ["LIFE", "TREE", "STORY"];

let letterGrid = Array.from({ length: gridSize }, () =>
  Array(gridSize).fill("")
);

console.log(letterGrid);

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

      const li = document.createElement("li");
      li.textContent = word;
      wordsUl.appendChild(li);
    }
  });
}

function fillGridWithRandomLetters() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (letterGrid[row][col] === "") {
        letterGrid[row][col] = randomGeneratedText();
      }
    }
  }
}

function renderGrid() {
  wordGrid.innerHTML = "";
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.textContent = letterGrid[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;
      wordGrid.appendChild(cell);
    }
  }
}

function randomGeneratedText() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

placeWordsInGrid();
fillGridWithRandomLetters();
renderGrid();
