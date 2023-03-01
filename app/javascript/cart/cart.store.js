console.log()
class Cart {
    _BASE_URL = `${window.location.origin}/cart/items`;

    constructor() {
        this.cartRenderer = new CartRender();
    }

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

    onInputChange(input, event, itemId) {
        const quantity = event.target.value;
        if (quantity <= 0) {
            this.cartRenderer.setRedBorder(input);
        } else {
            this.cartRenderer.setDefaultBorder(input);
            this.changeQuantity(itemId, quantity)
        }
    }

    async quickAddToCart(itemId, buttonId) {
        const response = await this._execute(
            `${this._BASE_URL}`,
            "POST",
            { id: itemId, quantity: 1 }
        );

        if (response.ok) {
            this.cartRenderer.setButtonPurchased(buttonId);

            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)
        }
    }

    async addToCart(itemId, inputId, buttonId) {
        const inputEl = document.getElementById(inputId);
        const quantity = Number(inputEl.value);

        if (quantity <= 0) {
            this.cartRenderer.setRedBorder(inputEl)
            return;
        }

        const response = await this._execute(
            `${this._BASE_URL}`,
            "POST",
            { id: itemId, quantity: quantity }
        );

        if (response.ok) {
            this.cartRenderer.setActionPurchased(inputId, buttonId);

            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)
        }
    }

    async changeQuantity(itemId, newQuantity) {
        const response = await this._execute(
            `${this._BASE_URL}/${itemId}`,
            "PUT",
            { quantity: newQuantity }
        );

        if (response.ok) {
            const data = await response.json();

            this.cartRenderer.setNewAmount(data.newAmount)
            this.cartRenderer.updateItemTotal(itemId, data.totalItem);
            this.cartRenderer.updateTotal(data.total);
        }
    }

    async deleteFromCart(itemId) {
        const response = await this._execute(
            `${this._BASE_URL}/${itemId}`,
            "DELETE"
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.deleteItemBlock(itemId);

            this.cartRenderer.setNewAmount(data.newAmount)
            this.cartRenderer.updateTotal(data.total);

            if (data.newAmount == 0) {
                document.location.href = "/";
            }
        }
    }

    async _execute(url, method, data) {
        return await fetch(url, {
            method: method,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

