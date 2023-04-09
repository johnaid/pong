// Define game objects
const ball = document.getElementById("ball");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");

// Define game parameters
const gameWidth = 640;
const gameHeight = 480;
const paddleSpeed = 5;
const ballSpeed = 2;
const ballSize = 20;

// Initialize game state
let ballX = gameWidth / 2 - ballSize / 2;
let ballY = gameHeight / 2 - ballSize / 2;
let ballVelocityX = ballSpeed;
let ballVelocityY = ballSpeed;
let paddle1Y = 200;
let paddle2Y = 200;

// Define game loop function
function gameLoop() {
  // Move the ball
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  // Bounce the ball off the top and bottom of the screen
  if (ballY < 0 || ballY + ballSize > gameHeight) {
    ballVelocityY = -ballVelocityY;
  }

  // Check for collisions with the paddles
  if (ballX < 20 && ballY + ballSize >= paddle1Y && ballY <= paddle1Y + 80) {
    ballVelocityX = ballSpeed;
  } else if (ballX + ballSize > gameWidth - 20 && ballY + ballSize >= paddle2Y && ballY <= paddle2Y + 80) {
    ballVelocityX = -ballSpeed;
  }

  // Bounce the ball off the paddles
  if (ballX < 20 && (ballY + ballSize < paddle1Y || ballY > paddle1Y + 80)) {
    // Player 2 scores
    resetBall();
  } else if (ballX + ballSize > gameWidth - 20 && (ballY + ballSize < paddle2Y || ballY > paddle2Y + 80)) {
    // Player 1 scores
    resetBall();
  }

  // Move the paddles
  if (keysPressed["w"] && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (keysPressed["s"] && paddle1Y < gameHeight - 80) {
    paddle1Y += paddleSpeed;
  }
  if (keysPressed["ArrowUp"] && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
  if (keysPressed["ArrowDown"] && paddle2Y < gameHeight - 80) {
    paddle2Y += paddleSpeed;
  }

  // Update the positions of the game objects
  ball.style.top = ballY + "px";
  ball.style.left = ballX + "px";
  paddle1.style.top = paddle1Y + "px";
  paddle2.style.top = paddle2Y + "px";

  // Call game loop function again
  requestAnimationFrame(gameLoop);
}

// Define function to reset the ball after a score
function resetBall() {
  ballX = gameWidth / 2 - ballSize / 2;
  ballY = gameHeight / 2 - ballSize / 2;
  ballVelocityX = ballSpeed;
  ballVelocityY = ballSpeed;
}

// Define keyboard event listeners
const keysPressed = {};
document.addEventListener("keydown", function(event) {
  keysPressed[event.key] = true;
});
document.addEventListener("keyup", function(event) {
  keysPressed[event.key] = false;
});

// Call game loop function to start the game
gameLoop();

// Define function to reset the game
function resetGame() {
resetBall();
paddle1Y = 200;
paddle2Y = 200;
}

// Define button event listener for resetting the game
// const resetButton = document.getElementById("reset-button");
//     resetButton.addEventListener("click", function() {
//     resetGame();
// });

// Define touch event listeners for mobile devices
let touchStartY = null;
document.addEventListener("touchstart", function(event) {
touchStartY = event.touches[0].clientY;
});
document.addEventListener("touchmove", function(event) {
if (touchStartY !== null) {
const touchCurrentY = event.touches[0].clientY;
const touchDistanceY = touchStartY - touchCurrentY;
if (touchDistanceY > 0 && paddle1Y > 0) {
paddle1Y -= paddleSpeed;
} else if (touchDistanceY < 0 && paddle1Y < gameHeight - 80) {
paddle1Y += paddleSpeed;
}
touchStartY = touchCurrentY;
}
});
document.addEventListener("touchend", function(event) {
touchStartY = null;
});

// Define function to display the score
// function displayScore(player1Score, player2Score) {
// const scoreElement = document.getElementById("score");
// scoreElement.innerText = player1Score - player2Score;
// }

// Initialize player scores
let player1Score = 0;
let player2Score = 0;
// displayScore(player1Score, player2Score);

// Define function to update the score
function updateScore() {
if (ballX < 0) {
player2Score += 1;
displayScore(player1Score, player2Score);
resetGame();
} else if (ballX + ballSize > gameWidth) {
player1Score += 1;
displayScore(player1Score, player2Score);
resetGame();
}
}

// Call update score function at regular intervals
setInterval(updateScore, 1000 / 60);