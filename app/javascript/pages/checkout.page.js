class CheckoutPage {
    _CHECKOUT_TOTAL_ID = "checkout-total";
    _CHECKOUT_TOTAL_ITEM_BASE_ID = "checkout-total-";
    _CHECKOUT_ITEM_BLOCK_BASE_ID = "item-block-";

    /**
     * Bind all inputs to check onChange event. when user changes amout of items
     * Input can be deleted, if user deleted item and than returned to chackout page (Turbo Rails renderer problem)
     * @param {Array} itemIds - array of item ids
    */
    bindAllInputs(itemIds) {
        itemIds.forEach(itemId => {
            const input = document.getElementById(itemId);
            if (input) {
                input.oninput = (event) => {
                    this.onInputChange(input, event, itemId);
                };
            }
        })
    }

    async onInputChange(input, event, itemId) {
        const quantity = event.target.value;
        if (quantity <= 0) {
            this._setInputInvalid(input);
        } else {
            this._setInputValid(input);

            try {
                const data = await cart.changeQuantity(itemId, quantity)
                this._updateItemTotal(itemId, data.totalItem)
                this._updateTotal(data.total)
            } catch (e) {
                //ignored
            }
        }
    }

    /**
     * Delete the item from the cart. If the cart is empty - - redirect to the root page.
     * @param {number} itemId - item id 
     */
    async onDeleteItem(itemId) {
        try {
            const data = await cart.deleteFromCart(itemId)
            this._updateTotal(data.total)
            this._deleteItemBlock(itemId);

            if (data.newAmount == 0) {
                document.location.href = "/";
            }
        } catch (e) {
            //ignored
        }
    }

    /**
     * Update a sum price for a particular item 
     * @param {number} itemId - item id
     * @param {number} newTotalItem - total price for an item based on quantity
     */
    _updateItemTotal(itemId, newTotalItem) {
        const totalItemEl = document.getElementById(`${this._CHECKOUT_TOTAL_ITEM_BASE_ID}${itemId}`);
        if (totalItemEl) {
            totalItemEl.innerText = `${newTotalItem} $`;
        }
    }

    _updateTotal(newTotal) {
        const totalEl = document.getElementById(this._CHECKOUT_TOTAL_ID);
        if (totalEl) {
            totalEl.innerText = `${newTotal} $`;
        }
    }

    _deleteItemBlock(itemId) {
        const itemBlockEl = document.getElementById(`${this._CHECKOUT_ITEM_BLOCK_BASE_ID}${itemId}`);
        if (itemBlockEl) {
            itemBlockEl.remove();
        }
    }

    _setInputInvalid(input) {
        input.style.borderColor = "red";
    }

    _setInputValid(input) {
        input.style.borderColor = null;
    }
}

const checkout = new CheckoutPage();