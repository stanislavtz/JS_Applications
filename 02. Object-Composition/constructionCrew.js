function solve(warker) {
    const requaredWater = 0.1 * warker.weight * warker.experience;

    if (warker.dizziness) {
        warker.levelOfHydrated += requaredWater;
        warker.dizziness = !warker.dizziness;
    }

    return warker;
}

console.log(solve({ weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true }
  
  ))