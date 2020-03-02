function solution(){
    const myObj = {
        extend: function(template) {
            for (const key in template) {
                if (typeof template[key] === 'function') {
                    Object.prototype[key] = template[key];
                } else {
                    this[key] = template[key];
                }
            }
        }
    }

    return myObj;
}