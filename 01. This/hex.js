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
        let that = this.valueOF() + this.valueOF.call(value);
        return `0x${that.toString(16).toUpperCase()}`;
    }

    minus(value) {
        let that = this.valueOF() - this.valueOF.call(value);
        return `0x${that.toString(16).toUpperCase()}`;
    }

    parse(str) {
        return parseInt(str, 16)
    }

}
let FF = new Hex(255);
console.log(FF.toString());
console.log(FF.valueOf() + 1);
console.log(FF.valueOf() + 1 == 256);
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
