var gamePattern = []; //gamePattern array keeps the track of the pattern of the game
var userClickedPattern = []; //userClickedPattern array keeps track of user clicked pattern
var buttonColours = ["red", "blue", "green", "yellow"];
//array representing colours of the buttons

var started = false;
//variable denoting that the game has not yet started
var level = 0;
//variable to keep track of the level of the game


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});
//keypress event occurs when the user press any key on the keyboard and the code inside it runs.
//if started is false then Level is 0 and We call NextSequence of sequence ,after that
//started become true that denotes that game has started

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
//click event occurs when we click on the buttons to play game
//the color of the button (i.e id representing color) that clicked get stored into userChosenColour
//that button clicked is stored in userClickedPattern
//that button clicked will play sound calling playSound() function
//button clicked will show animation calling animatePress
//checkAnswer is called to check the answer the user we pass userClickedPattern array length -1 to match the index of the gamePattern


function nextSequence() {
    //when userClickedPatter.length==gamePattern.length we re-intialize the userClickedPattern to empty
    userClickedPattern = [];
    //we increase the level by 1
    level++;
    //changing the text to Level -current level
    $("#level-title").text("Level " + level);

    //random no. is generated from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);
    //color at particular index is choosen randomly by random number
    var randomChosenColour = buttonColours[randomNumber];
    //we push the randomcolor choosen to the gamepattern
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //we are adding flash to colors red,blue,green,yellow of the buttons randomly

    playSound(randomChosenColour)
        //this play sound for randomly choosen color
}

function playSound(name) {
    //this function play sound when we click a particular button
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    //this function shows animation when we press the button ,pressed class code is excuted
    $("#" + currentColour).addClass("pressed");
    //animation removed after 100ms
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"), 100
    });
}

function checkAnswer(currentLevel) {
    //we check gamepattern color matches the userclickedPattern color or not
    // it matches success ,then the code runs when user click another button ,checkAnswer code runs
    //again ,then user click button again run, until or unless the user gives wrong answer the
    //else part run and games get over 
    //startOver function runs to start game again

    // If we play game again and again the code runs the same way
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            //if gamePattern.length ==userClickedPattern.length equal it means that 
            //user has clicked all the pattern right
            //now call nextsequence after 1000ms to show the next sequence.
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        //this all code runs when user press the wrong button
        console.log("wrong");
        //wrong answer sound is played
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        //game-over class is added to body to show some color
        $("body").addClass("game-over");
        //after 200ms it is removed from body
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        //text got changed to Game Over
        $("h1").text("Game Over, Press Any Key to Restart");
        //function calling to restart the game again
        startOver();
    }
}
//this function is to check start the game again
//we reset level to 0 and started 0 i.e game has not started,also gamePattern=[] means game has no pattern to match with user pattern
function startOver() {
    level = 0;
    started = 0;
    gamePattern = [];
}