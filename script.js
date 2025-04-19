const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const gameOverScreen = document.getElementById("gameOverScreen");

const gridSize = 15;
const tileCount = canvas.width / gridSize;

let snake, food, dx, dy, gameOver, tick;

function initGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  dx = 1;
  dy = 0;
  gameOver = false;
  tick = 0;
  gameLoop();
}

function gameLoop() {
  if (gameOver) return showGameOver();

  update();
  draw();
  setTimeout(gameLoop, 100);
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount ||
    snake.some((seg) => seg.x === head.x && seg.y === head.y)
  ) {
    gameOver = true;
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = "#f0f8ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tick++;

  // Draw snake with animated color
  for (let i = 0; i < snake.length; i++) {
    const s = snake[i];
    ctx.fillStyle = `hsl(${(tick * 5 + i * 20) % 360}, 70%, 60%)`;
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
  }

  // Draw food
  ctx.fillStyle = "#4682b4";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function showGameOver() {
  gameOverScreen.classList.remove("hidden");
  gameOverScreen.classList.add("fade-in");
}

// Direction Buttons
document.getElementById("up").addEventListener("click", () => {
  if (dy !== 1) {
    dx = 0;
    dy = -1;
  }
});
document.getElementById("down").addEventListener("click", () => {
  if (dy !== -1) {
    dx = 0;
    dy = 1;
  }
});
document.getElementById("left").addEventListener("click", () => {
  if (dx !== 1) {
    dx = -1;
    dy = 0;
  }
});
document.getElementById("right").addEventListener("click", () => {
  if (dx !== -1) {
    dx = 1;
    dy = 0;
  }
});

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  document.getElementById("controls").style.display = "block";
  initGame();
});
