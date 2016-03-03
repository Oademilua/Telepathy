var phonegapReady = function() {
    new jQuery.nd2Toast({
        message:"Ready to play",
        ttl: 5000
    });
}
document.addEventListener("deviceready", phonegapReady, false);

var my_no,count;

function load() {
    window.defaultStatus = "JavaScript Guess-a-Number Game";
    document.game.help.value = "Please set range of numbers and press the Start button.";
    document.game.from.focus(); 
}

function rnd(scale) {
    var dd = new Date();
    return((Math.round(Math.abs(Math.sin(dd.getTime())) * 8.71 * scale) % scale)); 
}

function range() {
    var to = 1 + 1 * document.game.to.value;
    count = 0;
    my_no = rnd(to);
    while(my_no < document.game.from.value) {
        my_no = rnd(to); 
    }
    document.game.help.value = "Please guess a number, enter it, and press Guess."; 
}

function guess() {
    var no = document.game.number.value;
    count++;
    if(no < my_no) document.game.help.value = "My number is greater than "+no+".";
    else if(no > my_no) document.game.help.value = "My number is less than "+no+".";
    else alert("It takes you "+count+" attempts to guess this number"); 
}

function GiveUp() {
    var no = document.game.number.value;
    guess = 0
    alert("The number was " + my_no +".  Reload page to start a new game....");
}