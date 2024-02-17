const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level=0;

let isGameStart = false;

$(document).keydown(function(e){
    if(isGameStart === false){
        isGameStart=true;
        nextSequence();
    }
})

$("div[type=button]").on("click", function(event){
    let userChosenColour = event.target.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); 

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);

    
    $("h1").text("Level "+level);
    level++;


}

function playSound(name){
    let sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    isGameStart = false;
}