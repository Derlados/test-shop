const cartRender = new CartRender();
const cart = new Cart();

/** Initialize cart data and its render class */
function init() {
    cartRender.init();
    cart.init();

    render();
}

/** For rerendering dynamical data, after move to a new page */
function render() {
    cartRender.render();
}