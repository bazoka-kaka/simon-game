let gamePattern = [];
let userClickedPattern = [];
let level = 0,
  gameplay = false,
  counter = 0;
const buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  $("h1").text("Level " + level++);
  const rand = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[rand];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function () {
  if (gameplay) {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    gameCheck();
  }
});

$(document).on("keydown", function (evt) {
  if (!gameplay) {
    gameplay = true;
    nextSequence();
  }
});

function playSound(color) {
  var audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

function gameCheck() {
  if (
    gamePattern[counter] == userClickedPattern[counter] &&
    counter >= gamePattern.length - 1
  ) {
    counter = 0;
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else if (gamePattern[counter] != userClickedPattern[counter]) {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    gameRestart();
  } else {
    counter++;
  }
}

function gameRestart() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameplay = false;
  counter = 0;
}
