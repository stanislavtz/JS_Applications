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
        for (let i = 0; i < 10; i++) {
            if (input.includes(`${i}`)) {
                input = input.replace(`{${i}}`, `${arguments[i + 1] ? arguments[i + 1] : `{${i}}`}`);
            }
            else {
                break;
            }
        }

        return input.toString();
    }
})()