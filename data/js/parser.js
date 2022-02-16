const input_Name = "textInput";
const output_Name = "textOutput";

var maxHealth = 20;
var health = maxHealth;

var level = 1;
var money = 500;

var aboutToDie = false;
var dead = false;

function interpreter(input, output, theCmd){
    const htmlInner = document.getElementById(output);
    if(dead == false){
        if(document.getElementById(input).value != ""){
            cmd = document.getElementById(input).value;
        }
        else{
            cmd = theCmd;
        }
        console.log(cmd);
        if(cmd != undefined) {
            cmdList = cmd.split(" ");
            if(cmdList[0] != null){
                switch(cmdList[0].toLowerCase()) {
                case "help":
                    htmlInner.innerHTML += cmd + "<br>" +
                    "List of Commands:" + "<br>" +
                    "-move &lt;location&gt;" + "<br>" +
                    "-look (at &lt;object&gt;)" + "<br>" +
                    "-stats" + "<br>";
                    break;
                case "move":
                    if(cmdList[1] != null){
                        htmlInner.innerHTML += cmd + "<br>" +
                        "You CANT Move" + "<br>";
                    }
                    else{
                        htmlInner.innerHTML += cmd + "<br>" +
                        "No move location" + "<br>";
                    }
                    break;
                case "look":
                    if(cmdList[1] != null && cmdList[2] != null){
                        htmlInner.innerHTML += cmd + "<br>" +
                        "You See Nothing" + "<br>";
                    }
                    else{
                        htmlInner.innerHTML += cmd + "<br>" +
                        "You See Nothing" + "<br>";
                    }
                    break;
                case "stats":
                    htmlInner.innerHTML += cmd + "<br>" +
                    buildStats() + "<br>";
                    break;
                case "debug":
                    if(cmdList[1] != null){
                        switch(cmdList[1]){
                        case "AH":
                            htmlInner.innerHTML += cmd + "<br>" +
                            "Added " + cmdList[2] + " amount of health" + "<br>";
                            health += parseInt(cmdList[2]);
                            break;
                        case "RH":
                            htmlInner.innerHTML += cmd + "<br>" +
                            "Removed " + cmdList[2] + " amount of health" + "<br>";
                            health -= cmdList[2];
                            break;
                        }
                        
                    }
                    break;
                default:
                    htmlInner.innerHTML += cmd + "<br>" +
                    "Command doesn't exist.<br>";
                    break;
                }
                console.log(health + "health")
            }
        }
        else {
            htmlInner.innerHTML += "Command is empty.<br>";
        }

        if(health <= 0){
            dead = true;
            htmlInner.innerHTML += "You died. Type &quot;retry&quot; to try again<br>";
        }
    }
    else {
        console.log(document.getElementById(input).value);
        if(document.getElementById(input).value == "retry"){
            htmlInner.innerHTML += document.getElementById(input).value + "<br>" + "You live again for now.<br>";
            health = maxHealth/2;
            dead = false;
        }
        else{
            htmlInner.innerHTML += document.getElementById(input).value + "<br>" + "You cant you are dead. Type &quot;retry&quot; to try again<br>";
        }
    }
    document.getElementById(input).value = "";
}

function buildStats(){
    var statsString = "";
    var healthString = "";
    healthString += "HP: ";
    var extraHealth = 0;
    if(0 < health - maxHealth){
        for (let i = 0; i < maxHealth; i++) {
            healthString += "#";
        }
        console.log("hi")
        extraHealth = health - maxHealth;
        console.log(healthString)
        healthString += "<span style='color: yellow;'>";
        for (let j = 0; j < extraHealth; j++) {
            healthString += "#";
        }
        healthString += "</span>";
    }
    else{
        for (let i = 0; i < health; i++) {
            healthString += "#";
        }
        healthString += "<span style='color: red;'>";
        for (let i = 0; i < maxHealth - health; i++) {
            healthString += "-";
        }
        healthString += "</span>";
    }
    var moneyString = money + " Moneies";
    var levelString = "Level " + level;

    statsString = levelString + "<br>" + healthString + "<br>" + moneyString;
    return statsString;
}

var storedBook = false;
var pageNumber = 1;
var pageArray = [];
if(storedBook == false){
    for (let index = 1; index < 100; index++) {
        pageArray[index] = "";
    }
}
else{
    console.log("got data");
}


function scrollEditor(direction){
    pageArray[pageNumber] = document.getElementById("theTextArea").value;
    switch(direction){
        case "forward":
            if(pageNumber < 99){
                pageNumber++;
            }
            break;
        case "backward":
            if(pageNumber > 1){
                pageNumber--;
            }
            break;
    }
    document.getElementById("theTextArea").value = pageArray[pageNumber];
    document.getElementById("pageNumber").innerHTML = pageNumber;
}

var inputConsole = document.getElementById(input_Name);
inputConsole.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        interpreter(input_Name, output_Name);
    }
});

