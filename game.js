let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(startGame);
$("button").click(startGame);

$(".btn").click(function (event) {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
  }
  $("button").hide();
}

function nextSequence() {
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern.length);

  let i = 0;
  function showLoop() {
    setTimeout(function () {
      $("#" + gamePattern[i])
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
      playSound(gamePattern[i]);
      i++;
      if (i < gamePattern.length) {
        showLoop();
      }
    }, 500);
  }
  showLoop();

  level++;
  $("h1").html("Level " + level);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //Check If User Clicked all the pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //When Game Over
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  $("h1").html("Game Over, Press Restart");
  level = 0;
  started = false;
  gamePattern = [];
  $("button").text("Restart");
  $("button").show();
}
