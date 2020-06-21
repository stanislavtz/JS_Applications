function solve() {
    let list = [];

    function add(el) {
        list.push(el);
        list.sort((a, b) => a - b);
        this.size = list.length;
    };

    function remove(index) {
        validateIndex(index);        
        list.splice(index, 1);
        this.size = list.length;
    }

    function get(index) {
        validateIndex(index);
        return list[index];
    }

    function validateIndex(index) {
        if(index >= 0 && index <= list.length - 1) {
            throw new Error('Index is out of range!')
        }
    }

    return {
        add,
        remove,
        get,
        size: 0
    }
}

let mylist = solve();
console.log(mylist.hasOwnProperty('add'))

mylist.add(5)
console.log(mylist.size)
