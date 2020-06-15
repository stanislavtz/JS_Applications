function getFibonator() {
    ppn = 0;
    pn = 1;

    return function () {
        let res = pn;
        [pn, ppn] = [pn + ppn, pn];
        return res;
    }
}