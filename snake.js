// Set up the touch controls
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
document.addEventListener('touchend', function (e) {
  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && direction !== 'left') {
      direction = 'right';
    } else if (deltaX < 0 && direction !== 'right') {
      direction = 'left';
    }
  } else {
    if (deltaY > 0 && direction !== 'up') {
      direction = 'down';
    } else if (deltaY < 0 && direction !== 'down') {
      direction = 'up';
    }
  }
});


// Set up the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Set up the game state
let snake = [{x: 10, y: 10}];
let food = {x: 0, y: 0};
let obstacles = [{x: 5, y: 5}, {x: 15, y: 15}]; // add some obstacles
let direction = 'right';
let score = 0;
let gameover = false;

// Set up the game loop
function gameLoop() {
    if (gameover) {
        return;
    }

    // Move the snake
    let head = {x: snake[0].x, y: snake[0].y};
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    // Check for collision with walls or self
    if (head.x < 0) {
        head.x = width / 10 - 1;
    } else if (head.x >= width / 10) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = height / 10 - 1;
    } else if (head.y >= height / 10) {
        head.y = 0;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameover = true;
        }
    }

      // Check for collision with walls, obstacles, or self
  if (head.x < 0 || head.x >= width / 10 || head.y < 0 || head.y >= height / 10) {
    gameover = true;
  }
  for (let i = 0; i < obstacles.length; i++) {
    if (head.x === obstacles[i].x && head.y === obstacles[i].y) {
      gameover = true;
    }
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameover = true;
    }
  }
if( gameover == true){
  alert('Game over!');

}

    // Draw the game
   ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);

    ctx.fillStyle = 'gray'; // add some color for the obstacles
    for (let i = 0; i < obstacles.length; i++) {
      ctx.fillRect(obstacles[i].x * 10, obstacles[i].y * 10, 10, 10);
    }
    ctx.fillStyle = 'white';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Schedule the next frame
    setTimeout(gameLoop, 100);
}

// Set up the keyboard controls
document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
    }
});

// Generate a new food item
function generateFood() {
    let x = Math.floor(Math.random() * width / 10);
    let y = Math.floor(Math.random() * height / 10);
    food = {x: x, y: y};
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood();
            break;
        }
    }
}

// Start the game
generateFood();
gameLoop();