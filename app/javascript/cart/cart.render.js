// Would be better to bind render with a cart by an observer
class CartRender {
    _AMOUNT_LABEL_ID = "cart-amount-label-id";

    constructor() {
        this.amount = 0;
    }

    setAmountOfItems(newAmount) {
        this.amount = newAmount;
    }

    render() {
        const amountLabel = document.getElementById(this._AMOUNT_LABEL_ID);
        this.amountLabel.innerText = this.amount;
    }
}