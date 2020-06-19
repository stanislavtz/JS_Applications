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
        }
    }

    return myObj;
}