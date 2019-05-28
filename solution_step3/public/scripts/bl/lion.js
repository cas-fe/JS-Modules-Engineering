import {Animal} from './animal.js';

export class Lion extends Animal {
    constructor(id, name) {
        super(id, `Lion: ${name}`);

        this.compatibleFood = [
            {name: 'beef', amount: 5, timeToNextFood: 5},
            {name: 'chicken', amount: 10, timeToNextFood: 1}
        ];
    }

    feed(eatable, callback) {
        if (!super.feed(eatable, callback)) {
            const panda = eatable.animals.filter(p => {
                return (p.isEatable && !p.isDead);
            });
            if (panda[0]) {
                this.setNextFeedAt(24, callback);
                panda[0].eaten();
                return true;
            }
            return false;
        }
        return true;
    };
}
