//Player enters name, health and attack are assigned
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//the console keeps track of the player's name, attack, and health
console.log(playerName, playerAttack, playerHealth);

//the console keeps track of enemy
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;


//fight function tells user that the games are starting
var fight = function () {
    window.alert("Welcome to Robot Gladiators!");
    //give player the choice to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    //if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
        //remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
    //check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
    playerHealth = playerHealth - enemyAttack;
    //Log a resulting message to the console so we know that it worked.
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
    //check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
} else if (promptFight === "skip" || promptFight === "SKIP") {
    //confirm player wants to quit
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    //if yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 2;
    }
    //if no (false), ask question again by running fight() again
    else {
        fight();
    }
} else {
    window.alert("You need to choose a valid option. Try again!");
}
};

//execute function
fight();