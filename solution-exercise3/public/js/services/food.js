export class Food {
    constructor(id, name, amount, amountPerDelivery, isMeet) {
        this.id = id;
        this.name = name || 'unknown';
        this.amount = amount || 0;
        this.amountPerDelivery = amountPerDelivery || 1;
        this.isMeet = Boolean(isMeet);
        this.isOrderPending = false;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            amountPerDelivery: this.amountPerDelivery,
            isMeet: this.isMeet
        };
    }
}
