// TODO: Step 2
//  - Create class AnimalService; use 'new AnimalService()' in Bootstrapper.
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
