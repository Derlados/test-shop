class Cart {
    _CART_LOCAL_STORAGE = "CART";

    constructor() {
        this.items = new Map();
        this.isInit = false;
    }

    init() {
        if (!this.isInit) {
            this.restoreFromLocalStorage();
            this.isInit = true;
        }
    }

    getAmountOfItems() {
        let sumAmount = 0;
        this.items.forEach((v) => {
            sumAmount += v;
        })

        return sumAmount;
    }

    addToCart(itemId, quantity = 1) {
        this.items.set(itemId, quantity);
        this.notifyChanges();
    }

    onChangeQuantity(itemId, newQuantity) {
        this.items.set(itemId, newQuantity);
        this.notifyChanges();
    }

    deleteFromCart(itemId) {
        this.items = this.items.filter(i => i.id != itemId)
        this.notifyChanges();
    }

    saveToLocalStorage() {
        localStorage.setItem(this._CART_LOCAL_STORAGE, JSON.stringify(Array.from(this.items)));
    }

    restoreFromLocalStorage() {
        if (localStorage.getItem(this._CART_LOCAL_STORAGE)) {
            this.items = new Map(JSON.parse(localStorage.getItem(this._CART_LOCAL_STORAGE)));
            cartRender.setAmountOfItems(this.getAmountOfItems())
        }
    }

    clear() {
        this.items = [];
        localStorage.removeItem(this._CART_LOCAL_STORAGE);
        this.notifyChanges();
    }

    notifyChanges() {
        this.saveToLocalStorage();
        cartRender.renderAmountOfItems(this.getAmountOfItems());
    }
}

