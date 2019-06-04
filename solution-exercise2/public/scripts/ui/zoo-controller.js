// TODO: Step 3
//  - Use ES2015 module syntax: Export class ZooController and import required dependencies
class ZooController {
    constructor(foodService, animalService) {
        this.foodService = foodService;
        this.animalService = animalService;

        this.foodTemplateCompiled = Handlebars.compile(document.getElementById('food-list-template').innerHTML);
        this.animalTemplateCompiled = Handlebars.compile(document.getElementById('animal-list-template').innerHTML);

        this.newAnimalName = document.getElementById('new-animal-name');
        this.newAnimalForm = document.getElementById('new-animal-form');
        this.animalContainer = document.getElementById('animal-container');
        this.foodContainer = document.getElementById('food-container');
    }

    showAnimals() {
        this.animalContainer.innerHTML = this.animalTemplateCompiled({animals: this.animalService.animals});
    }

    showFood() {
        this.foodContainer.innerHTML = this.foodTemplateCompiled({food: this.foodService.food});
    }

    initEventHandlers() {

        this.foodContainer.addEventListener('click', (event) => {
            const foodId = Number(event.target.dataset.foodId);

            if (!isNaN(foodId)) {
                event.target.setAttribute('disabled', true);

                this.foodService.orderFoodById(foodId);
                this.showFood();
                event.target.removeAttribute('disabled');
            }
        });

        this.animalContainer.addEventListener('click', (event) => {
            const animalId = Number(event.target.dataset.animalId);

            if (!isNaN(animalId)) {
                const feedingSucceeded = this.animalService.animals[animalId].feed(
                    {food: this.foodService.food, animals: this.animalService.animals},
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
            if (document.activeElement && this.animalService[createAction]) {
                this.animalService[createAction](this.newAnimalName.value);
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
        this.foodService.loadData();
        this.renderZooView();
    }
}
