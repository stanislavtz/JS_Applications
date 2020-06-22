function solve(worker) {
    const refill = 0.1 * worker.weight * worker.experience;
    const statusToRefill = Object.keys(worker)[2];
    const bodyCondition = Object.keys(worker)[3];
    if (worker[bodyCondition]) {
        worker[statusToRefill] += refill;
        worker[bodyCondition] = false;
    }
    
    return worker;
}