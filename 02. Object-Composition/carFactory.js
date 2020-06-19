function solve(input = { model, power, color, carriage, wheelsize }) {
    const engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 }

    }

    const carriages = {
        hatchback: { type: 'hatchback', color: '' },
        coupe: { type: 'coupe', color: '' }
    }

    return {
        model: input.model,
        engine: Object.values(engines).filter(e => e.power >= input.power)[0],
        carriage: Object.values(carriages)
            .reduce((acc, ele) => {
                if (ele.type === input.carriage) {
                    acc = Object.assign(acc, ele);
                    acc.color = input.color;
                }

                return acc;
            }, {}),
        wheels: input.wheelsize % 2 === 0 ? new Array(4).fill(input.wheelsize - 1) : new Array(4).fill(input.wheelsize)
    };
}

const order = {
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}

let result = solve(order);
console.log(result.model)
console.log(solve(order))