class Food {
    constructor(id, name, amount, amountPerDelivery, isMeet) {
        this.id = id;
        this.name = name || 'unknwon';
        this.amount = amount || 0;
        this.amountPerDelivery = amountPerDelivery || 1;
        this.isMeet = Boolean(isMeet);
        this.isOrderPending = false;
    }

    static fromDto({id, name, amount, amountPerDelivery, isMeet}) {
        return new Food(id, name, amount, amountPerDelivery, isMeet);
    }

    toDto() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            amountPerDelivery: this.amountPerDelivery,
            isMeet: this.isMeet
        }
    }
}
