/**
 * Cart renderer, updates cart's UI elements, like amount items in header and etc.
 */
class CartRender {
    _AMOUNT_LABEL_ID = "cart-amount-label-id";

    setNewAmount(newAmount) {
        const amountLabel = document.getElementById(this._AMOUNT_LABEL_ID);

        if (amountLabel) {
            amountLabel.innerText = newAmount;
        }
    }
}