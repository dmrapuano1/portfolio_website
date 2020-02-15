//Toy Problem 1.
var previousGuess, lastGuess, ranNum, guess, guessDiff, previousGuess, difference;
createNumber();
function createNumber(){ //Creates the random number
        ranNum = Math.floor(Math.random() * 20 + 1); 
        console.log('New Game. ' + ranNum + ' is the answer.'); //Logs random number for ease of testing
        return false; //used at the end of every function to ensure the form does not reload the page
    };
function newGame(){ //Code to reset the game after a player has won
    createNumber();
    refresh(); //simple fix to the second game having a lastGuess defined
    return false; 
};
function switchStatement(guess){ 
    difference = Math.abs(guess - ranNum); //Calculating the difference of the current guess from the number to guess
    previousDifference = Math.abs(lastGuess - ranNum); //Calculating the difference on the previous guess
    switch (true) { //Logic to determine how much closer or further away the new guess is from the previous guess
        case difference > previousDifference && guess !== ranNum:
            alert(guess + ': Colder. Last guess was: ' + lastGuess);
            break;
        case difference <= previousDifference && guess !== ranNum:
            alert(guess + ': Warmer. Last guess was: ' + lastGuess);
            break;
        case guess === ranNum :
            alert(guess + ': Winner!');
            newGame();
            break;
        default : //This is creating logic when there is no previous difference
            switch (true) { //Displaying how close or far away the 1st guess is from the random number
                case difference > 6:    
                    alert(guess + ': You\'re cold!');
                    break;
                case (difference <= 6 && difference > 4):
                    alert(guess + ': You\'re Warm');
                    break;
                case (difference <= 3 && difference > 0):
                    alert(guess + ': You\'re HOT! Almost got it!');
                    break;
                default :
                    alert('Something went wrong. I see \'' + difference + '\''); //Alerting the player the input was invalid
            };
    };
    lastGuess = guess; //Creating a last guess variable so guesses 2+ will always have a defined comparison
    return false;
}
 function check(){ //Runs due to HTML
    var guess = document.querySelector('.guess').value;
    guess = guess * 1; //making sure to compare numbers to numbers in statement guess === ranNum
    switchStatement(guess);
    return false; //Way of keeping the page from refreshing upon any form submission
};                                                
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                             
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  