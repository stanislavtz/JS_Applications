class Hex {
    constructor(value) {
        this.value = Number(value);
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(val) {
        return new Hex(this.valueOf() + this.defineValue(val));
    }

    minus(val) {
        return new Hex(this.valueOf() - this.defineValue(val));
    }

    parse(str) {
        return parseInt(str, 10);
    }

    defineValue(val) {
        return (val instanceof Hex) ? val.valueOf() : val;
    }
}