var triesLeft;
var randomNumber;
var endValue;
var needNewNumber = false;  // if this is true, you have to press generate num to be able to guess again

function saveInput(){

    // get end value and chosen tries
    // var endInput = document.getElementById('endnum');
    // var endValue = endInput.value;
    
    // store value so we dont loose it after switching browser
    localStorage.setItem("maxnumber", document.getElementById("endnum").value);
    endValue = localStorage.getItem("maxnumber");

    // var triesInput = document.getElementById('chosentries');
    // totalTries = triesInput.value;
    localStorage.setItem("maxtries", document.getElementById("chosentries").value);
    var totaltries = localStorage.getItem("maxtries");

    // triesLeft = totalTries;


    // store value so we dont loose it after switching browser
    // localStorage.setItem("username", document.getElementById("nameInput").value);


    // // get the random number to guess, including the endValue
    // randomNumber = generateNumber(endValue);
    // localStorage.setItem("generatednumber", randomNumber);

    
    
    console.log("max val: " + endValue + " tries: " + totaltries)
}

function start(){
    // generate random number
    pickNumber()
    
    // get how many tries you have
    triesLeft = localStorage.getItem("maxtries");
    if(!triesLeft || (triesLeft!=triesLeft)){// if not specified of NaN
        localStorage.setItem("maxtries", 10);
        triesLeft = localStorage.getItem("maxtries");
    }
    console.log("Max tries: "+ triesLeft);

    document.getElementById("guessishigherthannumber").innerHTML = "?";
    document.getElementById("guessednumber").innerHTML = "?";
    document.getElementById("guessislowerthannumber").innerHTML = "?";
    document.getElementById("msgBox").innerHTML = "New Number Generated";
}


function pickNumber(){
    // get max value
    endValue = localStorage.getItem("maxnumber");
    if(!endValue || (endValue!=endValue)){ // if not specified of NaN
        localStorage.setItem("maxnumber", 100);
        endValue = localStorage.getItem("maxnumber");
    }
    console.log("Endvalue: "+ endValue);

    // calculate number
    randomNumber = generateNumber(endValue);

    // save generated num to storage
    // localStorage.setItem("generatednumber", randomNumber);
    console.log("Number to guess is: " + randomNumber)
    needNewNumber = false;

}

function generateNumber(end){
    var number = Math.floor(Math.random() * end);
    return number;
}


function handleGuess(){
    if(needNewNumber){
        alert("You need to generate a new number!")
        return
    }
    if(!randomNumber){
        alert("You need to generate a number before you guess!")
        return
    }
    // a user has guessed a number, so we need to check if it is the correct one
    var guessInput = document.getElementById('guessednum');
    var guessValue = guessInput.value;

    console.log("Your guess: " + guessValue);

    // get the random number
    // var randomNumber = localStorage.getItem("generatednumber");
    // randomNumber = Number(randomNumber);

    // var totaltries = localStorage.getItem("maxtries");
    // randomNumber = Number(randomNumber);

    if (guessValue == randomNumber){
        playerWon();
        console.log("You won!");
    }
    // wrong guess, check if more tries
    else if (triesLeft == 0){
        playerLost();
        console.log("You lost!");
    }
    else if (triesLeft > 0){
        wrongGuess(guessValue);
        console.log("Wrong guess: Tries left = " + triesLeft);
    }
    else{
        console.error("error: handleGuess: " + triesLeft + " tries left");
    };
}

function playerWon(){
    document.getElementById("guessishigherthannumber").innerHTML = "YOU";
    document.getElementById("guessednumber").innerHTML = randomNumber;
    document.getElementById("guessislowerthannumber").innerHTML = "WON";
    needNewNumber = true; // cant guess agian until new number is generated
    document.getElementById("msgBox").innerHTML = "Tries left: " + triesLeft + " || Max number to guess: " + endValue;
}

function wrongGuess(guessValue){
    // decrease tries and let player know if it is up or down
    triesLeft--;
    if (guessValue > randomNumber){
        document.getElementById("guessishigherthannumber").innerHTML = "↓" + guessValue;
    }
    else if (guessValue < randomNumber){
        document.getElementById("guessislowerthannumber").innerHTML = "↑" + guessValue;
    }
    else{
        console.error("error: wrongGuess: guess value is " + guessValue + " || chosen number " + randomNumber);
    }
    document.getElementById("msgBox").innerHTML = "Tries left: " + triesLeft + " || Max number to guess: " + endValue;

}

function playerLost(){
    document.getElementById("guessishigherthannumber").innerHTML = "YOU";
    document.getElementById("guessednumber").innerHTML = randomNumber;
    document.getElementById("guessislowerthannumber").innerHTML = "LOST";
    needNewNumber = true; // cant guess agian until new number is generated
    document.getElementById("msgBox").innerHTML = "Tries left: " + triesLeft + " || Max number to guess: " + endValue;
}