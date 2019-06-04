// TODO: Step 2
//  - Extract class Panda, derive from Animal (class Panda extends Animal)
//  - Intention: Provide animal specialization with Panda behaviour
// TODO: Step 3
//  - Use ES2015 module syntax: Export class Panda and import dependencies
function createPanda(id, name) {
    const animal = createAnimal(id, `Panda: '${name}'`); // TODO: Step 2 - call base constructor: super(id, name)

    // override behavoir of generic animal (place as members inside Panda class)
    animal.isEatable = true;

    animal.compatibleFood = [
        {name: 'bamboo', amount: 1, timeToNextFood: 1}
    ];

    return animal;
}
