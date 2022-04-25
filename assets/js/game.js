//Player enters name, health and attack are assigned. These are variables so that we can keep track of the player's data.
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//the console keeps track of enemy. These are variables so that we can keep track of each enemy's data
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//fight function works as long as the player and the enemy are both alive (health > 0)
var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        //give player the choice to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if player chooses to skip, they will lose money
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        //the other case is that the player chooses to fight. Then the player attacks the enemy first.
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        //check enemy's health, if they die, end the loop here
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerMoney = playerMoney + 20;
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //Then the enemy attacks the player
        playerHealth = playerHealth - enemyAttack;
        //Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
        //check player's health, if they die, end the loop here
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

//execute startGame function
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
//to start a new game, iterating over the array of enemies as long as the player is alive
for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick new enemy from array
            var pickedEnemyName = enemyNames[i];
            //reset enemyHealth before starting new fight
            enemyHealth = 50;
            //debugger for later testing;

            //pass picked name through function (enemyName parameter)
            fight(pickedEnemyName);
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

var endGame = function() {
    window.alert("This game has now ended. Let's see how you did!");
    //if player is still alive, they win!
    if (playerHealth > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

//ask the player if they want to play again
var playAgainConfirm = window.confirm("Would you like to play again?");

if(playAgainConfirm){
    //restart game
    //play again
    startGame();
} else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};

// start first game when page loads
startGame();