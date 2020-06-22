(function solution() {
    String.prototype.ensureStart = function (s) {
        if (this.substring(0, s.length) === s) {
            return this.toString();
        }

        return s.concat(this);
    };

    String.prototype.ensureEnd = function (s) {
        if (this.substring(this.length - s.length) === s) {
            return this.toString();
        }

        return this.concat(s);
    };

    String.prototype.isEmpty = function () {
        if (this.length < 1) {
            return true;
        }
        return false;
    };

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return this.toString();
        }

        if (this.slice(0, n).includes(' ')) {
            return this.slice(0, n).slice(0, this.slice(0, n).trim().lastIndexOf(' ')).concat('...');
        }

        if (n >= 4) {
            return this.slice(0, n - 3).concat('...');
        }
       
        return '.'.repeat(n)
    };

    String.format = function (input) {
        let i = 0;
        while(true) {
            if (input.includes(i)) {
                input = input.replace(`{${i}}`, `${arguments[i + 1] ? arguments[i + 1] : `{${i}}`}`);
                i++;
                continue;
            }

            break;
        }

        return input.toString();
    }
})()

let str = 'my string';
console.log(str);

str = str.ensureStart('my');
console.log(str);

str = str.ensureStart('hello ');
console.log(str);

str = str.truncate(16);
console.log(str);

str = str.truncate(14);
console.log(str);

str = str.truncate(8);
console.log(str);

str = str.truncate(4);
console.log(str);

str = str.truncate(2);
console.log(str);

str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);

str = String.format('jumps {0} {1}', 'dog');
console.log(str);
