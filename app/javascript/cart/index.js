const cart = new Cart();

// reload the main page due to possible cart changes
window.addEventListener('popstate', () => {
    if (window.location.pathname == '/items' || window.location.pathname == '/checkout') {
        location.reload();
    }
})