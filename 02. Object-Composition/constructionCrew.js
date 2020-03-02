function solve(warker) {
    const requaredWater = 0.1 * warker.weight * warker.experience;

    if (warker.dizziness) {
        warker.levelOfHydrated += requaredWater;
        warker.dizziness = !warker.dizziness;
    }

    return warker;
}