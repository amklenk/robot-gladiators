//functions
//fumction to generate a random value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

//fight function works as long as the player and the enemy are both alive (health > 0)
var fight = function (enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        //give player the choice to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player chooses to skip, they will lose money
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from player's money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
        //the other case is that the player chooses to fight. Then the player attacks the enemy first.
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
        //check enemy's health, if they die, end the loop here
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //Then the enemy attacks the player
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        //Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        //check player's health, if they die, end the loop here
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

//execute startGame function
var startGame = function () {
    //reset player stats
    playerInfo.reset();
    //to start a new game, iterating over the array of enemies as long as the player is alive
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy from array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            //debugger for later testing;

            //pass picked name through function (enemy.name parameter)
            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes, take them to store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        //stop executing the function when the player dies
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    //after loop ends, the game ends
    endGame();
};

var endGame = function () {
    window.alert("This game has now ended. Let's see how you did!");
    //if player is still alive, they win!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    //ask the player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        //play again
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            //do nothing
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//function to set name
var getPlayerName = function() {
    var name = "";
while(name === "" || name === null) {
    name = prompt("What is your robot's name?");
}
console.log("Your robot's name is " + name);
return name;
};

//objects
//Player enters name, health and attack are assigned. These are variables so that we can keep track of the player's data.
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
}

//the console keeps track of enemy. These are variables so that we can keep track of each enemy's data
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start first game when page loads
startGame();