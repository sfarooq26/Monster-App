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

function writeToLog (event, target, value, playerHealth) {
    let logEntry;
    if (logEntry === LOG_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            target: 'Player',
            value: value,
            finalPlayerHealth: playerHealth,
            finalMonsterHealth: monsterHealth,
        }
        battlelog.push(logEntry);
        if (logEntry === LOG_STRONG_MONSTER_ATTACK) {
            logEntry = {
                event: event,
                target: 'Player',
                value: value,
                finalPlayerHealth: playerHealth,
                finalMonsterHealth: monsterHealth,
            }
            battlelog.push(logEntry);
            if ()
        }
    }
}


function reset () {
    if (+monsterHealthBar.value <= 0 ||
        +playerHealthBar.value <= 0 ) {
        resetGame(chosenMaxLife);
    }
}

function PlayersFate (damageValue) {
    const initialPlayerHealth = playerHealthValue;  //using var playerHealthValue in this funt only, .value in rest
    const playerDamage = dealPlayerDamage(damageValue);
 /*   playerHealthValue -= playerDamage;*/
    if (+playerHealthBar.value <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealthValue = +playerHealthBar.value;
        playerHealthValue = initialPlayerHealth;            //smth is wrong here, after using bonus, draws rightaway
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
}

function DamageMode(mode) {
    let monsterDamageValue;
    let playerDamageValue;
    if (mode === attackMode) {
        monsterDamageValue = ATTACK_VALUE;
        playerDamageValue = MONSTER_ATTACH_VALUE;
    }
else if (mode === strongAttackMode) {
        monsterDamageValue = STRONG_ATTACK;
        playerDamageValue = STRONG_MONSTER_ATTACK_VALUE;
        }
    dealMonsterDamage(monsterDamageValue);
    PlayersFate(playerDamageValue);
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
    reset();
}

attackBtn.addEventListener('click', attackCommand);
healBtn.addEventListener('click', healPlayer);
strongAttackBtn.addEventListener('click',StrongAttackCommand);

//function reset () {
//     if (!+monsterHealthBar.value ||
//         !+playerHealthBar.value) {
//         resetGame(chosenMaxLife);
//     }
// }