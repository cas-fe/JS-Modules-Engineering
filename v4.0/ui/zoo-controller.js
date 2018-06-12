import 'https://code.jquery.com/jquery-3.3.1.slim.min.js';

const $ = jQuery;

/**
 * Accommodates the controller logic to be used for the Zoo UI.
 */
class ZooController {

    constructor(zoo) {
        this.zoo = zoo;
        this.foodTemplateProcessor = null;
        this.animalTemplateProcessor = null;
    }

    /**
     * Initializes the VIEW templates to be used to render the UI.
     */
    initTemplates() {
        this.foodTemplateProcessor = Handlebars.compile($("#food-list-template").html());
        this.animalTemplateProcessor = Handlebars.compile($("#animal-list-template").html());
    }

    /**
     * Enforces the first UI initialization. Call that after the VIEW has been loaded.
     */
    initUI() {
        this.initTemplates();
        this.registerEvents();
        this.updateUI();
    }

    /**
     * Registers the UI events on the VIEW.
     */
    registerEvents() {
        $(document).on("click", "input[data-food-id]", e => this.handleFoodOrderClick(e));
        $(document).on("click", "input[data-animal-id]", e => this.handleAnimalFeedClick(e));

        $("#createPanda").click(
            () => {  // creates Panda Object
                this.zoo.animalService.addPanda($("#name").val());
                this.showAnimals();
            });

        $("#createLion").click(
            () => { // creates Lion Object
                this.zoo.animalService.addLion($("#name").val());
                this.showAnimals();
            });
    }

    /**
     * Enforces a UI update (re-rendering).
     */
    updateUI() {
        this.showAnimals();
        this.showFood();
    }

    /**
     * Enforces the update of the animal UI part.
     */
    showAnimals() {
        $("#containerAnimals").html(this.animalTemplateProcessor({ animals: this.zoo.animalService.animals }));
    }

    /**
     * Enforces the update of the food UI part.
     */
    showFood() {
        $("#containerFood").html(this.foodTemplateProcessor({ food: this.zoo.foodService.food }));
    }

    /**
     * Internal food click event handler.
     */
    async handleFoodOrderClick(event) {
        const target = $(event.target);
        const foodId = Number(target.data("food-id"));

        if (!isNaN(foodId)) {
            target.prop("disabled", true);

            await this.zoo.foodService.orderFoodById(foodId);
            this.showFood();
            target.prop("disabled", false);
        }
    }

    /**
     * Internal food click event handler.
     */
    async handleAnimalFeedClick(event) {
        const target = $(event.target);
        const animalId = Number(target.data("animal-id"));

        if (!isNaN(animalId)) {
            const feedHandle = this.zoo.animalService.animals[animalId].feed();

            if (feedHandle.enoughFood) {
                this.updateUI();
                await feedHandle.awaiter;
                this.updateUI();
            } else {
                target.val("Feed (No foood!)");
            }
        }
    }
}


/**
 * Exposed API facilities.
 */
export default ZooController;