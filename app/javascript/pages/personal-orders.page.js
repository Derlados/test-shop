class PersonalOrdersPage {
    _ARROW_OPEN_CLASS = "table__side-arrow_open";
    _ITEMS_LIST_OPEN_CLASS = "personal-orders__content_open";

    toggleOrder(arrow, itemsListId) {
        this._toggleElementClass(arrow, this._ARROW_OPEN_CLASS);
        this._toggleElementClass(document.getElementById(itemsListId), this._ITEMS_LIST_OPEN_CLASS);
    }

    _toggleElementClass(el, className) {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    }
}

const personalOrders = new PersonalOrdersPage();