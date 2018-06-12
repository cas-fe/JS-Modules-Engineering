import 'https://code.jquery.com/jquery-3.3.1.slim.min.js';

import FoodPersistance from './dl/food-persistance.js';
import AnimalContext from './bl/animal-context.js';
import ZooController from './ui/zoo-controller.js';

const $ = jQuery;

// bootstrap dependencies (optionally, a DI container may be used for this)
const persistance = new FoodPersistance();
const zoo = new AnimalContext(persistance);
const zooController = new ZooController(zoo);

$(function() { // on DOMContent Loaded

    // initialize main controller after VIEW (html) has been loaded
    zooController.initUI();
});