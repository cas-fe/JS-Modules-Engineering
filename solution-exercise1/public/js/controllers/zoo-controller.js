// TODO: Step 2
//  - Optional: Wrap features of zoo-controller into a class.
//  - Intention: ZooController controls UI logic and forwards events to corresponding business services.
// TODO: Step 3
//  - Import required dependencies by using ES2015 module syntax.
const foodTemplateCompiled = Handlebars.compile(document.getElementById('food-list-template').innerHTML);
const animalTemplateCompiled = Handlebars.compile(document.getElementById('animal-list-template').innerHTML);

const newAnimalName = document.getElementById('new-animal-name');
const newAnimalForm = document.getElementById('new-animal-form');
const animalContainer = document.getElementById('animal-container');
const foodContainer = document.getElementById('food-container');

function showAnimals() {
    animalContainer.innerHTML = animalTemplateCompiled(
        {animals: animalService.animals},
        {allowProtoPropertiesByDefault: true});
}

function showFood() {
    foodContainer.innerHTML = foodTemplateCompiled(
        {food: foodService.food},
        {allowProtoPropertiesByDefault: true});
}

function initEventHandlers() {
    foodContainer.addEventListener('click', (event) => {
        const foodId = Number(event.target.dataset.foodId);

        if (!isNaN(foodId)) {
            event.target.setAttribute('disabled', true);

            foodService.orderFoodById(foodId, () => showFood());
            showFood();
            event.target.removeAttribute('disabled');
        }
    });

    animalContainer.addEventListener('click', (event) => {
        const animalId = Number(event.target.dataset.animalId);

        if (!isNaN(animalId)) {
            const feedingSucceeded = animalService.animals[animalId].feed(
                {food: foodService.food, animals: animalService.animals},
                () => renderZooView());

            if (feedingSucceeded) {
                renderZooView();
            } else {
                event.target.value = 'Feed (No foood!)';
            }
        }
    });

    newAnimalForm.addEventListener('submit', (event) => {
        const createAction = document.activeElement.dataset.action;
        if (document.activeElement && animalService[createAction]) {
            animalService[createAction](newAnimalName.value);
            showAnimals();
        }
        event.preventDefault();
    });
}

function renderZooView() {
    showAnimals();
    showFood();
}

// initialize UI
function initialize() {
    initEventHandlers();
    foodService.loadData();
    renderZooView();
}

initialize();
