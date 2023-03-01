class ItemsPage {
    _PURCHASED_BUTTON_STYLE = "items__cart-btn_inactive";
    _PURCHASED_BUTTON_TEXT = "В корзине";

    async quickAddToCart(itemId, buttonId) {
        await cart.quickAddToCart(itemId);
        this._setButtonPurchased(buttonId);
    }

    _setButtonPurchased(buttonId) {
        const buttonEl = document.getElementById(buttonId);

        if (buttonEl) {
            buttonEl.classList.add(this._PURCHASED_BUTTON_STYLE)
            buttonEl.innerText = this._PURCHASED_BUTTON_TEXT;
            buttonEl.onclick = null;
        }
    }
}

const items = new ItemsPage();