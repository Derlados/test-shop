class Cart {
    _BASE_URL = `${window.location.origin}/cart/items`;

    constructor() {
        this.cartRenderer = new CartRender();
    }

    async quickAddToCart(itemId) {
        const response = await this._execute(
            `${this._BASE_URL}`,
            "POST",
            { id: itemId, quantity: 1 }
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)
        } else {
            throw new Error('request failed');
        }
    }

    async addToCart(itemId, quantity) {
        const response = await this._execute(
            `${this._BASE_URL}`,
            "POST",
            { id: itemId, quantity: quantity }
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)
        } else {
            throw new Error('request failed');
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
            return data;
        } else {
            throw new Error('request failed');
        }
    }

    async deleteFromCart(itemId) {
        const response = await this._execute(
            `${this._BASE_URL}/${itemId}`,
            "DELETE"
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)

            if (data.newAmount == 0) {
                document.location.href = "/";
            }

            return data;
        } else {
            throw new Error('request failed');
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

const cart = new Cart();