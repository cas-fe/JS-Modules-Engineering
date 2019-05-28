class Panda extends Animal {
    constructor(id, name) {
        super(id, `Panda: ${name}`);

        this.isEatable = true;
        this.compatibleFood = [
            {name: 'bambus', amount: 1, timeToNextFood: 1}
        ];
    }
}
