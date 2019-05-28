// TODO: Step 1
//  - Refactor facilities into a ZooController class.
//  - Intention: Controls UI logic and forwards events to corresponding business logic.

const foodTemplateCompiled =  Handlebars.compile(document.getElementById('food-list-template').innerHTML);
const animalTemplateCompiled =  Handlebars.compile(document.getElementById('animal-list-template').innerHTML);

const newAnimalName = document.getElementById('new-animal-name');
const newAnimalForm = document.getElementById('new-animal-form');
const animalContainer = document.getElementById('animal-container');
const foodContainer = document.getElementById('food-container');


function showAnimals() {
    animalContainer.innerHTML = animalTemplateCompiled({animals: animalService.animals});
}

function showFood() {
    foodContainer.innerHTML = foodTemplateCompiled({food: foodService.food});
}


function initEventHandlers() {

    foodContainer.addEventListener('click', async (event) => {
        const foodId = Number(event.target.dataset.foodId);
        
        if (!isNaN(foodId)) {
            event.target.setAttribute('disabled', true);
    
            await foodService.orderFoodById(foodId);
            showFood();
            event.target.removeAttribute('disabled');
        }
    });
    
    animalContainer.addEventListener('click', (event) => {
        const animalId = Number(event.target.dataset.animalId);

        if (!isNaN(animalId)) {
            const feedingSucceeded = animalService.animals[animalId].feed(
                { food: foodService.food, animals: animalService.animals },
                () => renderZooView());

            if (feedingSucceeded) {
                renderZooView();
            } else {
                event.target.value = 'Feed (No foood!)';
            }
        }
    });

    newAnimalForm.addEventListener('submit', (event) => {
        if (document.activeElement && animalService[document.activeElement.dataset.action]) {
            animalService[document.activeElement.dataset.action](newAnimalName.value);
            showAnimals();
        }
        event.preventDefault();
    });
}

function renderZooView() {
    showAnimals();
    showFood();
}

async function zooAction() {
    initEventHandlers();
    await foodService.loadData();
    renderZooView();
}