import {default as model} from './model.js';

;(function($) {

    const foodService = new model.FoodService();
    const animalService = new model.AnimalService(foodService);

    let foodTemplateProcessor = null;
    let animalTemplateProcessor = null;


    function showAnimals() {
        $("#containerAnimals").html(animalTemplateProcessor({ animals: animalService.animals }));
    }

    function showFood() {
        $("#containerFood").html(foodTemplateProcessor({ food: foodService.food }));
    }

    function updateUI() {
        showAnimals();
        showFood();
    }


    $(function () {
        foodTemplateProcessor =  Handlebars.compile($("#food-list-template").html());
        animalTemplateProcessor =  Handlebars.compile($("#animal-list-template").html());

        function handleFoodOrderClick(event) {
            let target = $(event.target);
            let foodId = Number(target.data("food-id"));

            if (!isNaN(foodId)) {
                target.prop("disabled", true);
                foodService.orderFoodById(foodId, function () {
                    showFood();
                    target.prop("disabled", false);
                });
            }
        }

        function handleAnimalFeedClick(event) {
            let target = $(event.target);
            let animalId = Number(target.data("animal-id"));

            if (!isNaN(animalId)) {
                if (animalService.animals[animalId].feed(() => updateUI())) {
                    updateUI();
                } else {
                    target.val("No foood!");
                }
            }
        }

        $(document).on("click", "input[data-food-id]", handleFoodOrderClick);
        $(document).on("click", "input[data-animal-id]", handleAnimalFeedClick);

        $("#createPanda").click(
            function () {  // creates Panda Object
                animalService.addPanda($("#name").val());
                showAnimals();
            });

        $("#createLion").click(
            function () { // creates Lion Object
                animalService.addLion($("#name").val());
                showAnimals();
            });

        updateUI();
    });

})(jQuery);