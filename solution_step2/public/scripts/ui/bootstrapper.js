class Bootstrapper {
    static start() {
        new Bootstrapper().renderZoo();
    }

    renderZoo() {
        const foodService = new FoodService(new FoodStorage());
        const animalService = new AnimalService();
        const zooController = new ZooController(animalService, foodService);

        zooController.zooAction();
    }
}
