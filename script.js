const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.createElement("div");
scoreBoard.classList.add("scoreBoard");
gameContainer.insertAdjacentElement("beforebegin", scoreBoard);

// Add the food with class "food" and unique id "foodPixel"
const foodPixel = document.createElement("div");
foodPixel.classList.add("food");
gameContainer.appendChild(foodPixel);

// Add the snake head with class "snakeBodyPixel" and unique id "pixel1"
const snakeHeadPixel = document.createElement("div");
snakeHeadPixel.classList.add("snakeBodyPixel");
snakeHeadPixel.id = "pixel1";
snakeHeadPixel.style.gridColumn = "1";
snakeHeadPixel.style.gridRow = "20";
gameContainer.appendChild(snakeHeadPixel);

// Initialize snake body and movement variables
const snakeBodyPixels = [snakeHeadPixel];
let snakeDirection = "right";
let score = 0;
let gameInProgress = true;
let intervalId;

// Add event listener for keydown events to change snake direction
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && snakeDirection !== "down") {
        snakeDirection = "up";
    } else if (event.key === "ArrowDown" && snakeDirection !== "up") {
        snakeDirection = "down";
    } else if (event.key === "ArrowLeft" && snakeDirection !== "right") {
        snakeDirection = "left";
    } else if (event.key === "ArrowRight" && snakeDirection !== "left") {
        snakeDirection = "right";
    }
});

// Move the snake by one pixel
function moveSnake() {
    // Get current head pixel coordinates
    let currentCol = parseInt(snakeHeadPixel.style.gridColumn);
    let currentRow = parseInt(snakeHeadPixel.style.gridRow);

    // Move the head pixel in the current direction
    if (snakeDirection === "up") {
        currentRow--;
    } else if (snakeDirection === "down") {
        currentRow++;
    } else if (snakeDirection === "left") {
        currentCol--;
    } else if (snakeDirection === "right") {
        currentCol++;
    }

    // Wrap snake to opposite side of grid if it goes off screen
    if (currentCol > 40) {
        currentCol = 1;
    } else if (currentCol < 1) {
        currentCol = 40;
    } else if (currentRow > 40) {
        currentRow = 1;
    } else if (currentRow < 1) {
        currentRow = 40;
    }

    // Check if the snake has collided with itself
    const collision = snakeBodyPixels.find(
        (pixel) =>
            pixel !== snakeHeadPixel &&
            parseInt(pixel.style.gridColumn) === currentCol &&
            parseInt(pixel.style.gridRow) === currentRow
    );
    if (collision) {
        endGame();
        return;
    }

    // Check if the head pixel is on a food pixel
    const foodPixel = document.querySelector(".food");
    if (
        parseInt(foodPixel.style.gridColumn) === currentCol &&
        parseInt(foodPixel.style.gridRow) === currentRow
    ) {
        score++;
        scoreBoard.textContent = "Score: " + score;
        addFood();
        const newTailPixel = createTailPixel();
        snakeBodyPixels.push(newTailPixel);
        gameContainer.appendChild(newTailPixel);
    } else {
        // Remove the tail pixel and move it to the front as the new head
        const tailPixel = snakeBodyPixels.pop();
        tailPixel.style.gridColumn = currentCol;
        tailPixel.style.gridRow = currentRow;
        snakeBodyPixels.unshift(tailPixel);
    }

    // Update the position of all snake body pixels
    for (let i = 0; i < snakeBodyPixels.length; i++) {
        const pixel = snakeBodyPixels[i];
        const previousPixel = i === 0 ? snakeHeadPixel : snakeBodyPixels[i - 1];
        if (pixel !== previousPixel) {
            pixel.style.gridColumn = previousPixel.style.gridColumn;
            pixel.style.gridRow = previousPixel.style.gridRow;
        }
    }
}

// Create a new tail pixel for the snake
function createTailPixel() {
    const tailPixel = document.createElement("div");
    tailPixel.classList.add("snakeBodyPixel");
    tailPixel.id = "pixel" + (snakeBodyPixels.length + 1);
    return tailPixel;
}

// Add a new food pixel in a random location
function addFood() {
    let randomCol, randomRow;
    do {
        randomCol = Math.floor(Math.random() * 40) + 1;
        randomRow = Math.floor(Math.random() * 40) + 1;
    } while (
        snakeBodyPixels.some(
            (pixel) =>
                parseInt(pixel.style.gridColumn) === randomCol &&
                parseInt(pixel.style.gridRow) === randomRow
        )
    );
    const foodPixel = document.querySelector(".food");
    foodPixel.style.gridColumn = randomCol;
    foodPixel.style.gridRow = randomRow;
}

// Start the game loop
intervalId = setInterval(moveSnake, 100);

// End the game and show the final score
function endGame() {
    clearInterval(intervalId);
    gameInProgress = false;
    alert("Game Over! Your score is " + score);
}
