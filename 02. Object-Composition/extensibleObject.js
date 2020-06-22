function solution() {
    const proto = {};
    const myObj = Object.create(proto);

    myObj.extend = function (template) {
        for (const key in template) {
            if (typeof template[key] === 'function') {
                proto[key] = template[key];
                continue;
            }
            this[key] = template[key];
        }
    }

    return myObj;
}

var temp = {
    method: () => {
        console.log('Hello')
    },
    propo: 'Stan' 
}
let result = solution();
result.extend(temp)
console.log(result);