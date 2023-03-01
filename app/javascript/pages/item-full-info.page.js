class ItemFullInfoPage {
    _PURCHASED_BUTTON_STYLE = "items__cart-btn_inactive";
    _PURCHASED_ITEM_FULL_BUTTON_STYLE = "item__cart-btn_inactive";
    _PURCHASED_BUTTON_TEXT = "В корзине";

    async onAddToCart(itemId, inputId, buttonId) {
        const inputEl = document.getElementById(inputId);
        const quantity = Number(inputEl.value);

        if (quantity <= 0) {
            this._setInputInvalid(inputEl)
            return;
        }
        try {
            await cart.addToCart(itemId, quantity);
            this._setActionPurchased(inputId, buttonId);
        } catch (e) {
            // ignored
        }
    }

    _setActionPurchased(inputId, buttonId) {
        const inputEl = document.getElementById(inputId);
        const buttonEl = document.getElementById(buttonId);

        if (inputEl && buttonEl) {
            buttonEl.classList.add(this._PURCHASED_ITEM_FULL_BUTTON_STYLE)
            buttonEl.innerText = this._PURCHASED_BUTTON_TEXT;
            buttonEl.onclick = null;

            inputEl.remove();
        }
    }

    _setInputInvalid(input) {
        input.style.borderColor = "red";
    }

    _setInputValid(input) {
        input.style.borderColor = null;
    }
}

const itemFullInfo = new ItemFullInfoPage();