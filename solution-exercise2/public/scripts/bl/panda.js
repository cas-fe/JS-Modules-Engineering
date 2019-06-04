// TODO: Step 3
//  - Use ES2015 module syntax: Export class Panda and import dependencies
class Panda extends Animal {
    constructor(id, name) {
        super(id, `Panda: '${name}'`);

        // override behavoir of generic animal (place as members inside Panda class)
        this.isEatable = true;

        this.compatibleFood = [
            {name: 'bamboo', amount: 1, timeToNextFood: 1}
        ];
    }
}
