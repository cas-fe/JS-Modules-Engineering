class AnimalService {
    constructor() {
        this.animals = [ ];
    }

    addLion(name) {
        const lion = new Lion(this.animals.length, name);
        this.animals.push(lion);
        return lion;
    }

    addPanda(name) {
        const panda = new Panda(this.animals.length, name);
        this.animals.push(panda);
        return panda;
    }
}
