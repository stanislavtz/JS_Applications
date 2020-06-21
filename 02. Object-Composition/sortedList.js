function solve() {
    class List {
        constructor() {
            this.list = [];
        }

        get size() {
            return this.list.length;
        }

        add(el) {
            this.list.push(el);
            this.list.sort((a, b) => a - b);
        }

        remove(index) {
            if (_checkIndex(index)) {
                this.list.splice(index, 1);
            }
        }

        get(index) {
            if (_checkIndex(index)) {
                return this.list[index];
            }
        }

        _checkIndex(index) {
            if (index >= 0 && index <= this.list.length - 1) {
                return true;
            }
            return false;
        }
    }

    return new List()
    
}

// function result() {
//     let list = [];

//     function add(el) {
//         list.push(el);
//         list.sort((a, b) => +a - +b);
//         this.size = list.length;
//     };

//     function remove(index) {
//         if (checkIndex(index)) {
//             list.splice(index, 1);
//             this.size = list.length;
//         }
//     }

//     function get(index) {
//         if (checkIndex(index)) {
//             return list[index];
//         }
//     }

//     function checkIndex(index) {
//         if(index >= 0 && index <= list.length - 1) {
//             return true;
//         }
//         return false;
//     }

//     return {
//         add,
//         remove,
//         get,
//         size: 0
//     }
// }

let mylist = solve();
console.log(mylist.hasOwnProperty('add'))

mylist.add(5)
console.log(mylist.size)
