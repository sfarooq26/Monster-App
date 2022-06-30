const ATTACK_VALUE  = 10;
const STRONG_ATTACK = ATTACK_VALUE * 2;
const MONSTER_ATTACH_VALUE = 12;
const STRONG_MONSTER_ATTACK_VALUE = MONSTER_ATTACH_VALUE * 2;
const HEAL_VALUE = 20;
const attackMode = 'ATTACK';
const strongAttackMode = 'STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'Monster attack';
const LOG_STRONG_MONSTER_ATTACK = 'Monster strong attack';
const LOG_PLAYER_ATTACK = 'Player attacks';
const LOG_PLAYER_STRONG_ATTACK = 'Strong player attack';
const LOG_PLAYER_HEAL = 'Player Heals';
const LOG_GAME_OVER = 'Game Over!';
let battlelog = [];


let chosenMaxLife = parseInt(prompt('Initial health of user and monster will be', '100'));
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
}

let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

let playerHealthValue = +playerHealthBar.value;
let monsterHealthValue = +monsterHealthBar.value;

function writeToLog (event, value, playerHealth, monsterHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalPlayerHealth: playerHealth,
        finalMonsterHealth: monsterHealth,
    }
    if (event === LOG_MONSTER_ATTACK) {
        logEntry.target = 'Player';
        }
    if (event === LOG_STRONG_MONSTER_ATTACK) {
        logEntry.target = 'Player';
        }
    if (event === LOG_PLAYER_ATTACK) {
        logEntry.target = 'Monster';
    }
    if (event === LOG_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'Monster';
    }
    battlelog.push(logEntry);
    }


function reset () {
    if (+monsterHealthBar.value <= 0 ||
        +playerHealthBar.value <= 0 ) {
        resetGame(chosenMaxLife);
        writeToLog(LOG_GAME_OVER, 'Reset', playerHealthBar.value, monsterHealthBar.value);
    }
}

function PlayersFate (damageValue, attackMode) {
    const initialPlayerHealth = playerHealthValue;  //using var playerHealthValue in this funt only, .value in rest
    const playerDamage = dealPlayerDamage(damageValue);
    playerHealthValue -= playerDamage;              // when removed causes error.
    if (+playerHealthBar.value <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealthValue = initialPlayerHealth;            //smth is wrong here, after using bonus, draws rightaway
        playerHealthValue = +playerHealthBar.value;
        setPlayerHealth(playerDamage);
        alert('Boi, your lucky day...just saved your *ss!')
    }
    if (+monsterHealthBar.value <= 0 && +playerHealthBar.value > 0) {
        alert('You won!');
    } else if (+playerHealthBar.value <= 0 && +monsterHealthBar.value > 0) {
        alert('You lose')
    } else if (+monsterHealthBar.value <= 0 && +playerHealthBar.value <= 0) {
        alert("It's a draw");
    }
    writeToLog(attackMode, playerDamage, playerHealthValue, monsterHealthBar.value );
}

function DamageMode(mode) {
    let monsterDamageValue;
    let playerDamageValue;
    let playerAttackMode;
    let monsterAttackMode;
    if (mode === attackMode) {
        monsterDamageValue = ATTACK_VALUE;
        playerDamageValue = MONSTER_ATTACH_VALUE;
        playerAttackMode = LOG_PLAYER_ATTACK;
        monsterAttackMode = LOG_MONSTER_ATTACK;
    }
else if (mode === strongAttackMode) {
        monsterDamageValue = STRONG_ATTACK;
        playerDamageValue = STRONG_MONSTER_ATTACK_VALUE;
        playerAttackMode = LOG_PLAYER_STRONG_ATTACK
        monsterAttackMode = LOG_STRONG_MONSTER_ATTACK;
        }
    const damage = dealMonsterDamage(monsterDamageValue);       //correction
/*    monsterHealthValue -= damage;*/  //Redundant...can use monsterHealthBar.value from calling dealMonsterDamage();
    writeToLog(playerAttackMode, damage, playerHealthValue, monsterHealthBar.value )   //Check later if playerHealthValue ok
    //smth is not right, both player and monster attack logs are showing at one click(attack)
    PlayersFate(playerDamageValue, monsterAttackMode);

    reset();
}

function attackCommand() {
    DamageMode(attackMode);
}

function StrongAttackCommand(){
    DamageMode(strongAttackMode);
}

function healPlayer() {
    increasePlayerHealth(HEAL_VALUE);
    PlayersFate(MONSTER_ATTACH_VALUE);   //gets attacked with each click
    writeToLog(LOG_PLAYER_HEAL, HEAL_VALUE, playerHealthValue, monsterHealthBar.value );
    reset();
}
function printLogHandler() {
    console.log(battlelog);
}
attackBtn.addEventListener('click', attackCommand);
healBtn.addEventListener('click', healPlayer);
strongAttackBtn.addEventListener('click',StrongAttackCommand);
logBtn.addEventListener('click', printLogHandler);

//function reset () {
//     if (!+monsterHealthBar.value ||
//         !+playerHealthBar.value) {
//         resetGame(chosenMaxLife);
//     }
// }