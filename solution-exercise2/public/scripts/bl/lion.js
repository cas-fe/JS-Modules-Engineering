// TODO: Step 3
//  - Use ES2015 module syntax: Export class Lion and import dependencies
class Lion extends Animal {
    constructor(id, name) {
        super(id, `Lion: '${name}'`);

        this.compatibleFood = [
            {name: 'beef', amount: 5, timeToNextFood: 5},
            {name: 'chicken', amount: 10, timeToNextFood: 1}
        ];
    }

    // override behavoir of generic animal (place as members inside Lion class)
    feed(eatable, callback) {
        if (!this.feedInternal(eatable, callback)) {
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
    }
}
