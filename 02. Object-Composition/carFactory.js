function solve({model, power, color, carriage, wheelsize}){
    const engines = {
        small: { power: 90, volume: 1800 },
        normal: { power: 120, volume: 2400 },
        monster: { power: 200, volume: 3500 }
    };

    const carriages = [
        { type: 'hatchback', color: '' },
        { type: 'coupe', color: '' }
    ];

    const searchedEngine =  Object.values(engines).find(e => e.power >= power);
    if (!searchedEngine) {
        throw new Error('There is no an engine, that you are searching for in our catalog!')
    };

    const searchedCarriage = carriages.find(c => c.type === carriage);
    if (!searchedCarriage) {
        throw new Error('There is not such a carriage in our catalog!')
    };
    
    searchedCarriage.color = color;

    const availableWheelsize = wheelsize % 2 === 0 ? wheelsize - 1 : wheelsize
    
    const wheels = Array(4).fill(availableWheelsize);

    const result = {
        model,
        engine: searchedEngine,
        carriage: searchedCarriage,
        wheels
    }
    
    return result;
}