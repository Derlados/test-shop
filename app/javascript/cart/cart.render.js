class CartRender {
    _AMOUNT_LABEL_ID = "cart-amount-label-id";



    setNewAmount(newAmount) {
        const amountLabel = document.getElementById(this._AMOUNT_LABEL_ID);

        if (amountLabel) {
            amountLabel.innerText = newAmount;
        }
    }


}