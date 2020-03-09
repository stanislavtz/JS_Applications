function solve() {
    class Melon {
        _element = this.constructor.name.replace('melon', '');

        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
    
            this.weight = weight;
            this.melonSort = melonSort;
        }

        get elementIndex () {
            return this.weight * this.melonSort.length;
        }

        toString() {
            let result = '';           

            result += `Element: ${this._element}\n`;;
            result += `Sort: ${this.melonSort}\n`;
            result += `Element Index: ${this.elementIndex}`

            return result;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort)
        }
    }

    class Melolemonmelon extends Melon{
        _elements = ['Fire', 'Earth', 'Air', 'Water'];
        _element = 'Water';

        constructor(weight, melonSort) {
            super(weight, melonSort)
        }

        morph() {
            this._element = this._elements.shift();
            this._elements.push(this._element);
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}