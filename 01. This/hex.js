class Hex {
    constructor(value) {
        this.value = Number(value);
    }

    valueOF() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(value) {
        return this.toString.call(15);
    }

}

let a = new Hex(10);
let b = new Hex(5);
console.log(a.toString())
console.log(b.toString())
console.log(toString.call(15))
// console.log(a.plus(b).toString());

