const input_Name = "textInput";
const output_Name = "textOutput";

var mainChar = {
    name: "Dick Tracy",

    inDebugMode: true,

    aboutToDie: false,
    dead: false,

    level: 1,
    xp: 0,
    money: 500,

    stats: {
        maxHealth: 20,
        health: 20,    
        attack: 200,
        defense: 0,
        speed: 15
    },

    inventory: [],

    inBattle: false,

    specialMoves: {}
}

var outputForm = document.getElementById(output_Name);

function game(){
    if(mainChar.dead == false){
        outputForm.innerHTML += interpreter(input_Name, "", mainChar);
    }
    else {
        if(document.getElementById(input_Name).value == "retry"){
            outputForm.innerHTML += document.getElementById(input_Name).value + "<br>" + "You live again for now.<br>";
            mainChar.stats.health = mainChar.stats.maxHealth/2;
            mainChar.dead = false;
            document.getElementById(input_Name).value = ""; 
        }
        else{
            outputForm += document.getElementById(input_Name).value + "<br>" + "You cant you are dead. Type &quot;retry&quot; to try again<br>";
        }
    }
    //console.table(mainChar);
}

var inputConsole = document.getElementById(input_Name);
inputConsole.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        game();
    }
});