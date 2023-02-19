//your code here
const gameContainer = document.getElementById("gameContainer");

// Generate 40x40 separate pixels with unique ids
for (let row = 1; row <= 40; row++) {
  for (let col = 1; col <= 40; col++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.id = "pixel" + ((row - 1) * 40 + col);
    gameContainer.appendChild(pixel);
  }
}

// Add the food with class "food" and unique id "foodPixel"
const foodPixel = document.createElement("div");
foodPixel.classList.add("food");
foodPixel.id = "foodPixel";
gameContainer.appendChild(foodPixel);

// Add the snake body with class "snakeBodyPixel" and unique ids
const snakeBodyPixel1 = document.createElement("div");
snakeBodyPixel1.classList.add("snakeBodyPixel");
snakeBodyPixel1.id = "pixel1";
snakeBodyPixel1.style.gridColumn = "1";
snakeBodyPixel1.style.gridRow = "20";
gameContainer.appendChild(snakeBodyPixel1);

const snakeBodyPixel2 = document.createElement("div");
snakeBodyPixel2.classList.add("snakeBodyPixel");
snakeBodyPixel2.id = "pixel2";
snakeBodyPixel2.style.gridColumn = "2";
snakeBodyPixel2.style.gridRow = "20";
gameContainer.appendChild(snakeBodyPixel2);

const snakeBodyPixel3 = document.createElement("div");
snakeBodyPixel3.classList.add("snakeBodyPixel");
snakeBodyPixel3.id = "pixel3";
snakeBodyPixel3.style.gridColumn = "3";
snakeBodyPixel3.style.gridRow = "20";
gameContainer.appendChild(snakeBodyPixel3);

// Add the score board with class "scoreBoard"
const scoreBoard = document.createElement("div");
scoreBoard.classList.add("scoreBoard");
scoreBoard.textContent = "Score: 0";
gameContainer.insertAdjacentElement("beforebegin", scoreBoard);

// Snake movement
let currentCol = 3;
let currentRow = 20;
let score = 0;
const scoreBoardEl = document.querySelector(".scoreBoard");

function moveSnake() {
  const newPixel = document.createElement("div");
  newPixel.classList.add("snakeBodyPixel");
  newPixel.id = "pixel" + (score + 4);
  newPixel.style.gridColumn = currentCol + 1;
  newPixel.style.gridRow = currentRow;
  gameContainer.appendChild(newPixel);

  const tailPixel = document.getElementById("pixel" + (score + 1));
  tailPixel.remove();

  const headPixel = document.getElementById("pixel" + (score + 4));
  if (headPixel.classList.contains("food")) {
    score++;
    scoreBoardEl.textContent = "Score: " + score;
    addFood();
  }

  currentCol++;

  if (currentCol > 40) {
    currentCol = 1;
  }

  setTimeout(moveSnake, 100);
}

function addFood() {
  const foodPixel = document.getElementById("foodPixel");
  foodPixel.classList.remove("food");
  const randomPixelId = Math.floor(Math.random() * 1600) + 1;
  const randomPixel = document.getElementById("pixel" + randomPixelId);
  randomPixel.classList.add("food");
}

addFood();
moveSnake();
