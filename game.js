const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Define the player paddle
let player = {
    x: 20, // starting x position
    y: canvas.height/2 - 50, // starting y position
    width: 10, // paddle width
    height: 100, // paddle height
    color: '#fff', // paddle color
    score: 0, // player's score
    speed: 10 // paddle speed
  };
  
  // Define the computer paddle
  let computer = {
    x: canvas.width - 30, // starting x position
    y: canvas.height/2 - 50, // starting y position
    width: 10, // paddle width
    height: 100, // paddle height
    color: '#fff', // paddle color
    score: 0, // computer's score
    speed: 7 // paddle speed
  };

  let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: '#fff', // paddle color

  };
  
  
// Ball properties
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 3;
let ballSpeedY = 3;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;

// Score properties
let playerScore = 0;
let computerScore = 0;

// Draw ball
ctx.beginPath();
ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

// Draw player paddle
ctx.beginPath();
ctx.rect(0, playerPaddleY, paddleWidth, paddleHeight);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

// Draw computer paddle
ctx.beginPath();
ctx.rect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

// Draw ball
ctx.beginPath();
ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

// Draw player paddle
ctx.beginPath();
ctx.rect(0, playerPaddleY, paddleWidth, paddleHeight);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

// Draw computer paddle
ctx.beginPath();
ctx.rect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
ctx.fillStyle = "#fff";
ctx.fill();
ctx.closePath();

document.addEventListener("keydown", movePlayerPaddle);

function movePlayerPaddle(e) {
  if (e.key === "ArrowUp") {
    playerPaddleY -= paddleSpeed;
  } else if (e.key === "ArrowDown") {
    playerPaddleY += paddleSpeed;
  }
}

function moveComputerPaddle() {
    const computerPaddleCenter = computerPaddleY + (paddleHeight / 2);
    if (computerPaddleCenter < ballY - 35) {
      computerPaddleY += paddleSpeed;
    } else if (computerPaddleCenter > ballY + 35) {
      computerPaddleY -= paddleSpeed;
    }
  }

  // Update ball position
ballX += ballSpeedX;
ballY += ballSpeedY;

// Check for collision with walls
if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
  ballSpeedY = -ballSpeedY;
}

// Check for collision with player paddle
if (ballX - ballRadius < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
  ballSpeedX = -ballSpeedX;
}

// Check for collision with computer paddle
if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
  ballSpeedX = -ballSpeedX;
}

// Check for scoring
if (ballX - ballRadius < 0) {
  computerScore++;
  resetBall();
} else if (ballX + ballRadius > canvas.width) {
  playerScore++;
  resetBall();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }
  
  function updateScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(playerScore, 100, 50);
    ctx.fillText(computerScore, canvas.width - 100, 50);
  }
  
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw objects
    drawBall();
    drawPaddles();
    updateScore();
  
    // Move paddles
    moveComputerPaddle();
  
    // Update ball position and check for collisions
    updateBall();
    
    // Request next frame
    requestAnimationFrame(draw);
  }
  
  function drawBall(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawPaddles() {
    // Draw player paddle
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
  
    // Draw computer paddle
    ctx.fillStyle = computer.color;
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);
  }

  function updateBall() {
    // update ball position
    ball.x += ball.speedX;
    ball.y += ball.speedY;
  
    // check for collision with top or bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
    }
  
    // check for collision with player or computer paddle
    if (ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height) {
      ball.speedX = -ball.speedX;
      ball.speedY += player.speedY / 2;
    } else if (ball.x + ball.radius > computer.x &&
               ball.y > computer.y &&
               ball.y < computer.y + computer.height) {
      ball.speedX = -ball.speedX;
      ball.speedY += computer.speedY / 2;
    }
  
    // update player or computer score and reset ball position
    if (ball.x - ball.radius < 0) {
      computer.score++;
      resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
      player.score++;
      resetBall();
    }
  }
  
  
  let paddleTop = canvas.height / 2 - paddleHeight / 2;

document.addEventListener("keydown", movePaddle);

function movePaddle(evt) {
  if (evt.keyCode === 38 && paddleTop > 0) {
    // up arrow key
    paddleTop -= paddleSpeed;
  } else if (evt.keyCode === 40 && paddleTop < canvas.height - paddleHeight) {
    // down arrow key
    paddleTop += paddleSpeed;
  }
}

// function drawPaddles() {
//   // Draw player's paddle
//   context.fillStyle = "#fff";
//   context.fillRect(paddleX, paddleTop, paddleWidth, paddleHeight);

//   // Draw computer's paddle
//   context.fillStyle = "#fff";
//   context.fillRect(computerPaddleX, computerPaddleY, paddleWidth, paddleHeight);
// }

  draw();
  
