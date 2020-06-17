function solve(worker) {
    const requaredWater = 0.1 * worker.weight * worker.experience;

    if (worker.dizziness) {
        worker.levelOfHydrated += requaredWater;
        worker.dizziness = !worker.dizziness;
    }

    return worker;
}