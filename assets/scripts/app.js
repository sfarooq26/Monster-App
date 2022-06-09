const ATTACK_VALUE  = 10;
const STRONG_ATTACK = ATTACK_VALUE * 2;
const MONSTER_ATTACH_VALUE = 12;
const STRONG_MONSTER_ATTACK_VALUE = MONSTER_ATTACH_VALUE * 2;
const HEAL_VALUE = 20;
let chosenMaxLife = 100;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);
let playerHealthValue = +playerHealthBar.value

function PlayersFate (damageValue) {
    const initialPlayerHealth = playerHealthValue;  //using var playerHealthValue in this funt only, .value in rest
    const playerDamage = dealPlayerDamage(damageValue);
    playerHealthValue -= playerDamage;
    if (+playerHealthBar.value <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealthValue = initialPlayerHealth;
        setPlayerHealth(playerHealthValue);
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
    if (mode === "ATTACK") {
        monsterDamageValue = ATTACK_VALUE;
        playerDamageValue = MONSTER_ATTACH_VALUE;
    }
else if (mode === 'STRONG_ATTACK') {
        monsterDamageValue = STRONG_ATTACK;
        playerDamageValue = STRONG_MONSTER_ATTACK_VALUE;
        }
    dealMonsterDamage(monsterDamageValue);
    PlayersFate(playerDamageValue);
    if (!+monsterHealthBar.value ||
        !+playerHealthBar.value) {
        resetGame(  100);
    }
}

function attackCommand() {
    DamageMode('ATTACK');
}

function StrongAttackCommand(){
    DamageMode('STRONG_ATTACK');
}

function healPlayer() {
    increasePlayerHealth(HEAL_VALUE);
    PlayersFate(MONSTER_ATTACH_VALUE);   //gets attacked with each click
    if (!+monsterHealthBar.value ||
        !+playerHealthBar.value) {
        resetGame(  100);
    }
}
attackBtn.addEventListener('click', attackCommand);
healBtn.addEventListener('click', healPlayer);
strongAttackBtn.addEventListener('click',StrongAttackCommand);
