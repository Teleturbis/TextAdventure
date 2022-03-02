var encounter = {
    enemies:[
        {
            name: "yes",
            stats: {
                health: 20,
                attack: 1,
                defense: 0,
                speed: 5
            }
        },
        {
            name: "yes2",
            stats: {
                health: 14,
                attack: 1,
                defense: 0,
                speed: 6
            }
        },
        {
            name: "yes3",
            stats: {
                health: 26,
                attack: 1,
                defense: 0,
                speed: 2
            }
        }
    ],
    rewards:[
        
    ]
}

function interpreter(input, theCmd, charObject){
    let parserOutput = "";
    if(charObject.inBattle){
        console.log(handleEnemies(charObject), "yessyes");
        parserOutput += handleEnemies(charObject);
    }
    let cmd = [];
    if(document.getElementById(input).value != ""){
        cmd = document.getElementById(input).value;
    }
    else{
        cmd = theCmd;
    }
    //console.log(cmd);
    if(cmd != undefined) {
        let cmdList = cmd.split(" ");
        if(cmdList[0] != null){
            switch(cmdList[0].toLowerCase()) {
            case "help":
                parserOutput += commandDisplayer(cmd, help(charObject));
                break;
            case "move":
                parserOutput += commandDisplayer(cmd, move(cmdList, charObject));
                break;
            case "look":
                parserOutput += commandDisplayer(cmd, look(cmdList, charObject));
                break;
            case "stats":
                parserOutput += charObject.inBattle != true ? commandDisplayer(cmd, buildStats(charObject)) : commandDisplayer(cmd, "You're in battle");
                break;
            case "attack":
                parserOutput += commandDisplayer(cmd, attack(cmdList, charObject, enemys));
                break;
            case "debug":
                parserOutput += charObject.inDebugMode == true ? commandDisplayer(cmd, debug(cmdList, charObject)) : commandDisplayer(cmd, "Not in debug Mode");
                break;
            default:
                parserOutput += commandDisplayer(cmd, "Command doesn't exist.");
                break;
            }
            //console.log(health + "health")
        }
    }
    else {
        parserOutput += "Command is empty.<br>";
    }

    if(charObject.stats.health <= 0){
        //console.log(charObject.dead + " sassas");
        charObject.dead = true;
        parserOutput += commandDisplayer(cmd, "You died. Type &quot;retry&quot; to try again");
    }
    if(charObject.inBattle){
        parserOutput += handleEnemies(charObject);
    }
    checkInit();
    document.getElementById(input).value = "";
    //console.log("ysas" + parserOutput);
    
    return parserOutput;
}

function commandDisplayer(cmdString, outputString){
    return cmdString + "<br>" + outputString + "<br>";
}


//adventure functions
function help(charObject){
    let output = "";
    if(!charObject.inBattle){
        output = "List of Commands:" + "<br>" +
        "-move &lt;location&gt;" + "<br>" +
        "-look (at &lt;object&gt;)" + "<br>" +
        "-stats";
    }
    else{
        output += "List of Battle Commands:" + "<br>" +
        "-move &lt;location&gt;" + "<br>" +
        "-look";
    }
    return output;
}

function move(cmdList, charObject){
    let output = "";
    if(!charObject.inBattle){
        if(cmdList[1] != null){
            output += "You CANT Move";
        }
        else{
            output += "No move location";
        }
    }
    else{
        output += "testbattle";
    }
    return output;
}

function look(cmdList, charObject){
    let output = "";
    if(!charObject.inBattle){
        if(cmdList[1] != null && cmdList[2] != null){
            output += "You See at Nothing";
        }
        else{
            output += "You See Nothing";
        }
    }
    else{
        output += displayBattleMap();
    }
    
    return output;
}

function img(cmdList){
    let output = "";
    if(cmdList[2] != null){
        switch(cmdList[2]){
            case "cga":
                output += "<img src='cgaredtest.png' alt='house' width='100%' style='margin-top: 1vh'>" + "<br>" +
                "You enter the rundown house.";
                break;
            case "apple":
                output += "<img src='appleIItest.png' alt='house' width='100%' style='margin-top: 1vh'>" + "<br>" +
                "You enter the rundown house.";
                break;
            default:
                output += "no img";
                break;
        }
    }
    else{
        output += "no img";
    }
    return output;
}

function attack(cmdList, charObject, encounter){
    let output = "";
    if(cmdList[1]){
        //output += "You Attack Nothing";
        if(!charObject.inBattle){
            output += startEncounter(cmdList, charObject, encounter);
        }
        else{
            output += attackEnemy(cmdList, charObject);
        }
        
    }
    else{
        output += "no target";
    }
    return output;
}


//debug
function debug(cmdList, charObject){
    let output = "";
    if(cmdList[1] != null){
        switch(cmdList[1]){
        case "AH":
            output += "Added " + cmdList[2] + " amount of health";
            charObject.stats.health += parseInt(cmdList[2]);
            break;
        case "RH":
            output += "Removed " + cmdList[2] + " amount of health";
            charObject.stats.health -= cmdList[2];
            break;
        case "IMG":
            output += img(cmdList);
            break;
        }
        
    }
    return output;
}


//display functions
function buildStats(charObject){
    var statsString = "";
    var healthString = "";
    healthString += "HP: ";
    var extraHealth = 0;
    if(0 < charObject.stats.health - charObject.stats.maxHealth){
        for (let i = 0; i < charObject.stats.maxHealth; i++) {
            healthString += "#";
        }
        console.log("hi")
        extraHealth = charObject.stats.health - charObject.stats.maxHealth;
        console.log(healthString)
        healthString += "<span style='color: yellow;'>";
        for (let j = 0; j < extraHealth; j++) {
            healthString += "#";
        }
        healthString += "</span>";
    }
    else{
        for (let i = 0; i < charObject.stats.health; i++) {
            healthString += "#";
        }
        healthString += "<span style='color: red;'>";
        for (let i = 0; i < charObject.stats.maxHealth - charObject.stats.health; i++) {
            healthString += "-";
        }
        healthString += "</span>";
    }
    var moneyString = charObject.money + " Moneies";
    var levelString = "Level " + charObject.level;

    statsString = levelString + "<br>" + healthString + "<br>" + moneyString;
    return statsString;
}

function displayBattleMap(){
    let map = "test";
    
    return map;
}


//menu
var indexItemsStyles = {
    info: "visibility: visible; height: 100%; padding: 15px",
    editor: "visibility: visible; height: 100%;"
}

function activateMenu(nameOf){
    Object.keys(indexItemsStyles).forEach(element => {
        document.getElementById(element).style.visibility = "hidden";
        document.getElementById(element).style.height = "0px";
        document.getElementById(element).style.padding = "0px";
    });
    document.getElementById(nameOf).style = indexItemsStyles[nameOf];
}
activateMenu("info");



//notepad
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

