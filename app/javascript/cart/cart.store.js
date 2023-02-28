class Cart {
    _BASE_URL = 'http://localhost:3000/cart/items';



    constructor() {
        this.cartRenderer = new CartRender();
    }

    bindAllInputs(itemIds) {
        console.log("bind");
        itemIds.forEach(itemId => {
            const input = document.getElementById(itemId);
            input.oninput = (event) => {
                this.onInputChange(input, event, itemId);
            };
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
        const quantity = Number(document.getElementById(inputId).value);

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

    async deleteFromCart(itemId, itemElementId) {
        const response = await this._execute(
            `${this._BASE_URL}/${itemId}`,
            "DELETE"
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.deleteItem(itemElementId);

            this.cartRenderer.setNewAmount(data.newAmount)
            this.cartRenderer.updateTotal(data.total);
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

