const ATTACK_VALUE  = 10;
const STRONG_ATTACK = ATTACK_VALUE * 2;
const HEAL_VALUE = 10;
let chosenMaxLife = 100;

adjustHealthBars(chosenMaxLife);

function StrongAttack(){
    attackCommand(STRONG_ATTACK);

}

function healPlayer() {
    increasePlayerHealth(HEAL_VALUE);
}


function attackCommand() {
dealMonsterDamage(ATTACK_VALUE);
dealPlayerDamage(ATTACK_VALUE);
    if (!+monsterHealthBar.value ||
        !+playerHealthBar.value) {
        resetGame(  100);
    }
}



attackBtn.addEventListener('click', attackCommand);
healBtn.addEventListener('click', healPlayer);
strongAttackBtn.addEventListener('click',StrongAttack);
