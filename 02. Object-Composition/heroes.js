function solve() {
    class Hero {
        constructor(name) {
            this.name = name;
            this.health = 100;
        }

        attack (opponent) {
            if(opponent.power > this.power) {
                this.health--;
            } else {
                opponent.health--;
            }
        }

        drinkSpell(qtty) {
            return this.power += Math.floor(qtty * 0.20);
        }
    }

    class Mage extends Hero {
        constructor(name) {
            super(name);
            this.mana = 100;
            this.power = 99;
        }

        cast(spell) {
            this.mana--;
            console.log(`${this.name} cast ${spell}`);
        }
    }

    class Fighter extends Hero {
        constructor(name) {
            super(name);
            this.stamina = 100;
            this.power = 98;
        }

        fight() {
            this.stamina--;
            console.log(`${this.name} slashes at the foe!`);
        }
    }

    return { 
        mage: (input) => new Mage(input), 
        fighter: (input) => new Fighter(input) 
    }
}


let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);

scorcher.attack(scorcher2);
scorcher2.drinkSpell(10);
scorcher2.attack(scorcher);

console.log(scorcher2.health);
console.log(scorcher.health);


