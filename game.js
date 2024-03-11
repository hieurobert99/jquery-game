var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).on("keypress", function(event){
    if(gamePattern.length===0){
        $("#level-title").text("Level " + gamePattern.length)
        nextSequence();
    }

});

$(".btn").on("click", function(){
    if(gamePattern.length!==0){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
    
})



function nextSequence(){
    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random() *4)
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + gamePattern.length)
}

function playSound(name){
    new Audio("./sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
    console.log("."+currentColour);
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
            nextSequence();
          }, 1000);
        }

    } else {
        $("body").addClass(".game-over");
        setTimeout(function () {
            $("body").removeClass(".game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        gamePattern=[];
    }            
}
