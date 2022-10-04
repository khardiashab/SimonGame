var gamePattern = []
var userClickPattern = []
var buttonColor = ["green", "red", "yellow", "blue"]

function effects(query) {
    // sound effect
    let fileName = "sounds/" + query + ".mp3"
    let audio = new Audio(fileName)
    audio.play();

    // flash effect
    query = "." + query
    $(query).fadeIn(100).fadeOut(100).fadeIn(100)


}



// * for changing heading of the game 
function header() {
    if (level == 0) {
        $(".heading").text("Game Over, Press any Key to Restart")
    }
    else {
        $(".heading").text(level + " level");
    }
}

// * next Sequence for randomly choosen number for the pattern
function nextSequence() {
    //* this is only calls when user change the level 
    userClickPattern = []

    //* header function for changing heading
    header()

    //! take a random number and add it in gamePattern array
    let randomNUmber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColor[randomNUmber]
    gamePattern.push(randomChosenColor);

    console.log(gamePattern)

    //* showing effects on it 
    effects(randomChosenColor)


}
function isClickable() {
    //! user only click when his/ her term otherwise mouse click not working 
    if (gamePattern.length < userClickPattern.length || level == 0) {
        return false
    }
    else return true
}

//! when user input the wrong pattern 

function wrongSoundPlay() {
    // * sound effect
    let audio = new Audio("sounds/wrong.mp3")
    audio.play()

    // * for display opacity doing  less
    $('body').addClass("wrong")
    $("body").fadeIn(100).fadeOut(100).fadeIn(100)
    $('body').removeClass("wrong")
}

function clicking() {
    if (isClickable()) {

        //todo: I put here 1 to 4 value in the button and val gets those value choose from the color
        let val = this.innerHTML
        let userChosenColor = buttonColor[val - 1]

        //* adding effects on user click
        //! if user add right color then it effect the button

        //! we userclickPattern. lenght because it we did not add this userinput in its array so its lenght is one less then it could be
        if (userChosenColor == gamePattern[userClickPattern.length]) {
            effects(userChosenColor);
        }
        else {
            wrongSoundPlay();
            level = 0
            gamePattern.length = 0
            started = false
            header();

        }

        userClickPattern.push(userChosenColor)
        // console.log(gamePattern)
        console.log("user: " + userClickPattern)

        if (userClickPattern.length == gamePattern.length) {
            level++
            setTimeout(function () {
                nextSequence();
            }, 700);
        }

    }
}

// * for game started or not 
var started = false;

// * for level counting 
var level = 0;

$(document).keypress(() => {
    if (!started) {
        //* calling next sequence function
        level++;
        nextSequence();

        // * game started 
        started = true
    }
})

$(".x-box").click(clicking)







