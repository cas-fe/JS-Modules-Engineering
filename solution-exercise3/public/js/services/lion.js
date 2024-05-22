import {Animal} from './animal.js';

export class Lion extends Animal {
    constructor(id, name) {
        super(id, `Lion: '${name}'`);

        this.compatibleFood = [
            {name: 'beef', amount: 5, timeToNextFood: 1.5},
            {name: 'chicken', amount: 10, timeToNextFood: 1}
        ];
    }

    // override behaviour of generic animal (place as members inside Lion class)
    feed(eatable, callback) {
        if (!this.feedInternal(eatable, callback)) {
            const panda = eatable.animals.filter(p => {
                return (p.isEatable && !p.isDead);
            });
            if (panda[0]) {
                this.setNextFeedAt(2, callback);
                panda[0].eaten();
                return true;
            }
            return false;
        }
        return true;
    }
}
