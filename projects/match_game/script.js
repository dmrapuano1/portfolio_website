var a, s, d, f, j, k, l, semicolin, tryCount;
resetValues(); //reset game on page load

function resetValues(){ //Coding to restart the values in resetGame
    a = 0
    s = 0
    d = 0
    f = 0
    j = 0
    k = 0
    l = 0
    semicolin = 0
    tryCount = 0  
}; 
function lostScript(){ //Script to close the game if player reaches maximum attempts
    alert('No match. Game Over');
    resetGame()
}; 
function winScript(){ //Script to alert win and reset the game
    setTimeout(function() {
        alert('You Win!');
    resetGame();
    }, 100);
}; 
function resetGame(){ //Coding to restart the game
    document.querySelector("p[data-key='65']").style.display = 'none' //a
    document.querySelector("p[data-key='83']").style.display = 'none' //s
    document.querySelector("p[data-key='68']").style.display = 'none' //d
    document.querySelector("p[data-key='70']").style.display = 'none' //f
    document.querySelector("p[data-key='74']").style.display = 'none' //j
    document.querySelector("p[data-key='75']").style.display = 'none' //k
    document.querySelector("p[data-key='76']").style.display = 'none' //l
    document.querySelector("p[data-key='186']").style.display = 'none' //;
    resetValues()
    }; 
function checkLoss(){ //Script to alert if player lost if game has set attempts
    tryCount = a + s + d + f + j + k + l + semicolin
    if (tryCount >= 4){
        lostScript()
    }   else {
        console.log('Total tries this game: ' + tryCount)
    }
}; 
function checkWin(){ //script to check if the correct buttons are pressed, then checks if game is lost (if lost script is set to < 5 attempts)
    if (a + f === 2 || s + l === 2 || d + j === 2 ||k + semicolin === 2 ){
        winScript()
    } else{
        checkLoss()
    };
    
};

window.onload = function() { //allows everything to be ran on screen load
    document.querySelector('#newBtn').addEventListener('click', resetGame); //Gives New Button ability to restart game
    document.querySelector('#resetBtn').addEventListener('click', resetGame); //Gives Reset Button ability to restart game
    window.addEventListener('keydown', function(keyPressed) { //Listens for any button to be pressed, then run keyPressed 
             
    var cards = document.querySelectorAll(".word"); //Pulls all cards with keywork 'word' from index.html
        function showAnimal(keyNumber){ //displays the card coresponding to the letter pressed
            document.querySelector("p[data-key='" + keyNumber + "']").style.display = 'block';
        }
        for (i = 0; i < cards.length; i++){
            if (keyPressed.keyCode == cards[i].dataset.key){
                showAnimal(keyPressed.keyCode);
                switch (true){
                    case keyPressed.keyCode == cards[0].dataset.key : //pulls key 'A'
                        a = 1;  //Sets a to 'on' so checkWin can check the pair if it is 'on' as well.
                        break;
                    case keyPressed.keyCode == cards[1].dataset.key : //pulls key 'S'
                        s = 1;
                        break;
                    case keyPressed.keyCode == cards[2].dataset.key : //pulls key 'D'
                        d = 1;
                        break;
                    case keyPressed.keyCode == cards[3].dataset.key : //pulls key 'F'
                        f = 1;
                        break;
                    case keyPressed.keyCode == cards[4].dataset.key : //pulls key 'J'
                        j = 1;
                        break;
                    case keyPressed.keyCode == cards[5].dataset.key : //pulls key 'K'
                        k = 1;
                        break;
                    case keyPressed.keyCode == cards[6].dataset.key : //pulls key 'L'
                        l = 1;
                        break;
                    case keyPressed.keyCode == cards[7].dataset.key : //pulls key ';'
                        semicolin = 1;
                        break;
                    default :
                        console.log('keypressed ', keyPressed.keyCode);        
                };
                checkWin();
            } else {
                console.log(keyPressed.keyCode)
            }
        }     
    });
}; 
    
    


























