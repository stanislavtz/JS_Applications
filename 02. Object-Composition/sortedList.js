function result() {
    let collection = [];

    function add(el) {
        collection.push(el);
        collection.sort((a, b) => +a - +b);
        this.size = collection.length;
    };

    function remove(index) {
        if (index >= 0 && index <= collection.length - 1) {
            collection.splice(index, 1);
            this.size = collection.length;
        }
    }

    function get(index) {
        if(index >= 0 && index <= collection.length - 1) {
            return collection[index];
        }
    }

    return {
        add,
        remove,
        get,
        size: 0
    }
}