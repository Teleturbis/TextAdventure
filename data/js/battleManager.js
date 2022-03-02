var currentFight = [];
var fightOrder = [];
var fightIndex = 0;
var attackInit = false;

function checkInit(){
    if(attackInit){
        attackInit = false;
    }
}

function checkWin(charObject){
    if(currentFight.length == 0){
        charObject.inBattle = false;
        return true;
    }
    else{
        return false;
    }
}

function startEncounter(cmdList, charObject, enemys){
    fightIndex = 0;
    let output = "";
    if(cmdList[1]){
        //output += "You attack Nothing";
        enemys.forEach(function(enemy, idx, array){
            if (idx === array.length - 1){ 
                output += enemy.name + " attacks";
            }
            else{
                output += enemy.name + " attacks<br>";
            }
         });
         currentFight = [...enemys];
         let saveList = [];
         currentFight.forEach(enemy => {
            saveList.push(enemy);
         });
         saveList.push(charObject);
         saveList.sort(function(b, a) {
            return a.stats.speed - b.stats.speed;
        });
        saveList.forEach(element => {
            fightOrder.push(element.name);
        });
        //console.log(fightOrder);
    }
    else{
        output += "You Attack Nothing";
    }
    charObject.inBattle = true;
    attackInit = true;
    return output;
}

function attackEnemy(cmdList, charObject){
    let output = "";
    if(cmdList[1]){
        //console.log("oi lets go");
        let enemy = currentFight.find(f => f.name == cmdList[1]);
        if(enemy != null){
            output += "You Attacked " + cmdList[1] + "<br>";
            output += doDamageCalc(charObject, enemy, true);
            fightIndex++;
            if(fightIndex >= fightOrder.length){
                if(checkWin(charObject)){
                    output += "<br>You Win";
                    return output;
                }
                fightIndex = 0;
            }
        }
        else{
            output += "There is no enemy called " + cmdList[1];
        }
    }
    else{
        output += "You Attack Nothing";
    }
    console.table(currentFight);
    return output;
}

function doDamageCalc(charObject, enemy, isYou){
    let output = "";
    let damage = 0;

    if (isYou) {
        damage = charObject.stats.attack - enemy.stats.defense;
        enemy.stats.health -= damage;
        if(enemy.stats.health <= 0){
            output += enemy.name + " has been defeated";
            fightOrder.splice(fightOrder.indexOf(enemy.name), 1);
            currentFight.splice(currentFight.map(e => e.name).indexOf(enemy.name), 1);
        }
        else{
            output += enemy.name + " took " + damage + " damage";
        }
    }
    else {
        damage = enemy.stats.attack - charObject.stats.defense;
        charObject.stats.health -= damage;
        output += charObject.name + " took " + damage + " damage";
    }
    return output;
}

function attackChar(charObject){
    let output = "";

    //console.log(fightOrder[fightIndex]+"yoyo")
    let enemy = currentFight.find(f => f.name == fightOrder[fightIndex]);

    output += doDamageCalc(charObject, enemy, false) + "<br>";

    return output;
}

function handleEnemies(charObject){
    if(!attackInit){
        let output = "";
        for (let s = 0; s < fightOrder.length; s++) {
            if(fightOrder[fightIndex] != charObject.name && fightOrder[fightIndex] != undefined){
                output += attackChar(charObject);
                fightIndex++;
                console.log(fightIndex, "ssssss");
                //console.log(fightIndex, "indexyes");
                //console.log(fightOrder[fightIndex] != charObject.name, "indexno");
            }
            else{
                //console.log("yyyyyy" + output);
                if(fightIndex >= fightOrder.length){
                    if(checkWin(charObject)){
                        output += "You Win<br>"
                        return output;
                    }
                    fightIndex = 0;
                }
                return output;
            }
        }
    }
    else{
        return "";
    }
}
