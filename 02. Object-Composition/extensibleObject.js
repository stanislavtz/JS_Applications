<<<<<<< HEAD
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
=======
function solution(){
    const proto = {};
    const myObj = Object.create(proto);

    myObj.extend = addProperty;
    function addProperty(template) {
        for (const key in template) {
            if(typeof template[key] === 'function') {
                proto[key] = template[key];
                continue;
            }

            myObj[key] = template[key];
>>>>>>> d5993f5da84f49ba6a88598614e31b0f3d620c5d
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