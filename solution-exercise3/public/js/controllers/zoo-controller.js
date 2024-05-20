import {foodService} from '../services/food-service.js';
import {animalService} from '../services/animal-service.js';

export class ZooController {
    constructor() {
        this.foodTemplateCompiled = Handlebars.compile(document.getElementById('food-list-template').innerHTML);
        this.animalTemplateCompiled = Handlebars.compile(document.getElementById('animal-list-template').innerHTML);

        this.newAnimalName = document.getElementById('new-animal-name');
        this.newAnimalForm = document.getElementById('new-animal-form');
        this.animalContainer = document.getElementById('animal-container');
        this.foodContainer = document.getElementById('food-container');
    }

    showAnimals() {
        this.animalContainer.innerHTML = this.animalTemplateCompiled(
            {animals: animalService.animals},
            {allowProtoPropertiesByDefault: true});
    }

    showFood() {
        this.foodContainer.innerHTML = this.foodTemplateCompiled(
            {food: foodService.food},
            {allowProtoPropertiesByDefault: true});
    }

    initEventHandlers() {

        this.foodContainer.addEventListener('click', (event) => {
            const foodId = Number(event.target.dataset.foodId);

            if (!isNaN(foodId)) {
                event.target.setAttribute('disabled', true);

                foodService.orderFoodById(foodId, () => this.showFood());
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

    initialize() {
        this.initEventHandlers();
        foodService.loadData();
        this.renderZooView();
    }
}

// create one-and-only instance
new ZooController().initialize();
