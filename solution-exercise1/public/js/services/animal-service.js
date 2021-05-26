// TODO: Step 2
//  - Create class AnimalService; instantiate a const animalService = new AnimalService(); and use it in your controller.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class AnimalService and import dependencies (e.g. Lion / Panda)
const animalService = {
    animals: [ ],

    addLion(name) {
        const lion = createLion(this.animals.length, name);
        this.animals.push(lion);
        return lion;
    },

    addPanda(name) {
        const panda = createPanda(this.animals.length, name);
        this.animals.push(panda);
        return panda;
    }
};
