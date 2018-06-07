import AnimalContext from '../bl/animal-context.js';
import FoodPersistance from '../dl/food-persistance.js';

;(function($) {

    const zoo = new AnimalContext(new FoodPersistance());

    let foodTemplateProcessor = null;
    let animalTemplateProcessor = null;


    function showAnimals() {
        $("#containerAnimals").html(animalTemplateProcessor({ animals: zoo.animalService.animals }));
    }

    function showFood() {
        $("#containerFood").html(foodTemplateProcessor({ food: zoo.foodService.food }));
    }

    function updateUI() {
        showAnimals();
        showFood();
    }


    $(function () {
        foodTemplateProcessor =  Handlebars.compile($("#food-list-template").html());
        animalTemplateProcessor =  Handlebars.compile($("#animal-list-template").html());

        async function handleFoodOrderClick(event) {
            const target = $(event.target);
            const foodId = Number(target.data("food-id"));

            if (!isNaN(foodId)) {
                target.prop("disabled", true);

                await zoo.foodService.orderFoodById(foodId);
                showFood();
                target.prop("disabled", false);
            }
        }

        async function handleAnimalFeedClick(event) {
            const target = $(event.target);
            const animalId = Number(target.data("animal-id"));

            if (!isNaN(animalId)) {
                const feedHandle = zoo.animalService.animals[animalId].feed();

                if (feedHandle.enoughFood) {
                    updateUI();
                    await feedHandle.awaiter;
                    updateUI();
                } else {
                    target.val("Feed (No foood!)");
                }
            }
        }

        $(document).on("click", "input[data-food-id]", handleFoodOrderClick);
        $(document).on("click", "input[data-animal-id]", handleAnimalFeedClick);

        $("#createPanda").click(
            function () {  // creates Panda Object
                zoo.animalService.addPanda($("#name").val());
                showAnimals();
            });

        $("#createLion").click(
            function () { // creates Lion Object
                zoo.animalService.addLion($("#name").val());
                showAnimals();
            });

        updateUI();
    });

})(jQuery);
