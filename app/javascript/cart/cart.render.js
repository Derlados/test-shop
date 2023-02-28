// Would be better to bind render with a cart by an observer
class CartRender {
    _AMOUNT_LABEL_ID = "cart-amount-label-id";
    _CHECKOUT_TOTAL_ID = "checkout-total";
    _CHECKOUT_TOTAL_ITEM_BASE_ID = "checkout-total-";

    _PURCHASED_BUTTON_STYLE = "items__cart-btn_inactive";
    _PURCHASED_ITEM_FULL_BUTTON_STYLE = "item__cart-btn_inactive";
    _PURCHASED_BUTTON_TEXT = "В корзине";

    setDefaultBorder(element) {
        element.style.borderColor = null;
    }

    setRedBorder(element) {
        element.style.borderColor = "red";
    }

    updateItemTotal(itemId, newTotalItem) {
        const totalItemEl = document.getElementById(`${this._CHECKOUT_TOTAL_ITEM_BASE_ID}${itemId}`);
        if (totalEl && totalItemEl) {
            totalItemEl.innerText = `${newTotalItem} $`;
        }
    }

    updateTotal(newTotal) {
        const totalEl = document.getElementById(this._CHECKOUT_TOTAL_ID);
        if (totalEl) {
            totalEl.innerText = `${newTotal} $`;
        }
    }

    setNewAmount(newAmount) {
        const amountLabel = document.getElementById(this._AMOUNT_LABEL_ID);

        if (amountLabel) {
            amountLabel.innerText = newAmount;
        }
    }

    setButtonPurchased(buttonId) {
        const buttonEl = document.getElementById(buttonId);

        if (buttonEl) {
            buttonEl.classList.add(this._PURCHASED_BUTTON_STYLE)
            buttonEl.innerText = this._PURCHASED_BUTTON_TEXT;
            buttonEl.onclick = null;
        }
    }

    setActionPurchased(inputId, buttonId) {
        const inputEl = document.getElementById(inputId);
        const buttonEl = document.getElementById(buttonId);

        if (inputEl && buttonEl) {
            buttonEl.classList.add(this._PURCHASED_ITEM_FULL_BUTTON_STYLE)
            buttonEl.innerText = this._PURCHASED_BUTTON_TEXT;
            buttonEl.onclick = null;

            inputEl.remove();
        }
    }

    deleteItem(itemElementId) {
        const itemBlockEl = document.getElementById(itemElementId);

        if (itemBlockEl) {
            itemBlockEl.remove();
        }
    }
}