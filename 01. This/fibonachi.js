function getFibonator() {
    let pNum = 0;
    let cNum = 1;

    return function() {
        let result = cNum;
        [cNum, pNum] = [cNum + pNum, cNum];
        return result;
    }
}

let fib = getFibonator();

for (let i = 0; i < 100; i++) {
    console.log(fib())
}