/**
 * Cart service, for woking with user cart via AJAX requests. 
 * @property {CartRender} - class for updating UI elements. Calls after each succesful request
 */
class Cart {
    _BASE_URL = `${window.location.origin}/cart/items`; // ONLY because of API and frontend are on the same domain

    constructor() {
        this.cartRenderer = new CartRender();
    }

    /**
     * Add item in 1 quantity
     * @param {number} itemId - item id
     * @returns {Promise<{total: number, newAmount: number, totalItem: number}>}
     */
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

    /**
     * Add item with specify quantity
     * @param {number} itemId - item id
     * @returns {Promise<{total: number, newAmount: number, totalItem: number}>}
     */
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

    /**
     * Change item's quantity in cart
     * @param {number} itemId - item id 
     * @param {number} newQuantity - new quantity of item 
     * @returns {Promise<{total: number, newAmount: number, totalItem: number}>}
     */
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

    /**
     * Delete item from cart
     * @param {number} itemId - item id
     * @returns {Promise<{total: number, newAmount: number, totalItem: number}>}
     */
    async deleteFromCart(itemId) {
        const response = await this._execute(
            `${this._BASE_URL}/${itemId}`,
            "DELETE"
        );

        if (response.ok) {
            const data = await response.json();
            this.cartRenderer.setNewAmount(data.newAmount)

            return data;
        } else {
            throw new Error('request failed');
        }
    }

    /**
     * Request builder to avoid repeating always the same code
     * @param {string} url - url
     * @param {GET|POST|PUT|PATCH|DELETE} method - http method 
     * @param {any} data - request body 
     * @returns 
     */
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