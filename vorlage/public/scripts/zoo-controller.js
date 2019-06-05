// TODO: Step 1
//  - Move zoo-controller.js to a new file location 'scripts/ui/zoo-controller.js'. Reference this new file as <script src='...' defer></script> in zoo.html.
//  - Analyze code: Is there any long method inside ZooController? How could you refactor that lines of code?
//  - Intention: Structure/bundle cohesive files as first step to modularization.
// TODO: Step 2
//  - Pass the animal-service and food-service as constructor arguments into constructor and save those arguments as instance fields (e.g. this.animalService / this.foodService).
//  - Use those instance fields instead the global 'animalService' / 'foodService' variables.
//  - Intention: Controls UI logic and forwards events to corresponding business services.
// TODO: Step 3
//  - Use ES2015 module syntax: Export class ZooController and import required dependencies
class ZooController {
    constructor() {
        this.foodTemplateCompiled = Handlebars.compile(document.getElementById('food-list-template').innerHTML);
        this.animalTemplateCompiled = Handlebars.compile(document.getElementById('animal-list-template').innerHTML);

        this.newAnimalName = document.getElementById('new-animal-name');
        this.newAnimalForm = document.getElementById('new-animal-form');
        this.animalContainer = document.getElementById('animal-container');
        this.foodContainer = document.getElementById('food-container');
    }

    showAnimals() {
        this.animalContainer.innerHTML = this.animalTemplateCompiled({animals: animalService.animals});
    }

    showFood() {
        this.foodContainer.innerHTML = this.foodTemplateCompiled({food: foodService.food});
    }

    initEventHandlers() {

        this.foodContainer.addEventListener('click', (event) => {
            const foodId = Number(event.target.dataset.foodId);

            if (!isNaN(foodId)) {
                event.target.setAttribute('disabled', true);

                foodService.orderFoodById(foodId);
                this.showFood();
                event.target.removeAttribute('disabled');
            }
        });

        this.animalContainer.addEventListener('click', (event) => {
            const animalId = Number(event.target.dataset.animalId);

            if (!isNaN(animalId)) {
                const feedingSucceeded = animalService.animals[animalId].feed(
                    {food: foodService.food, animals: animalService.animals},
                    () => this.renderZooView());

                if (feedingSucceeded) {
                    this.renderZooView();
                } else {
                    event.target.value = 'Feed (No foood!)';
                }
            }
        });

        this.newAnimalForm.addEventListener('submit', (event) => {
            const createAction = document.activeElement.dataset.action;
            if (document.activeElement && animalService[createAction]) {
                animalService[createAction](this.newAnimalName.value);
                this.showAnimals();
            }
            event.preventDefault();
        });
    }

    renderZooView() {
        this.showAnimals();
        this.showFood();
    }

    zooAction() {
        this.initEventHandlers();
        foodService.loadData();
        this.renderZooView();
    }
}
