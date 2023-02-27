class PersonalOrdersPage {
    static _ARROW_OPEN_CLASS = "table__side-arrow_open";
    static _ITEMS_LIST_OPEN_CLASS = "personal-orders__content_open";

    static toggleOrder(arrow, itemsListId) {
        this._toggleElementClass(arrow, PersonalOrdersPage._ARROW_OPEN_CLASS);
        this._toggleElementClass(document.getElementById(itemsListId), PersonalOrdersPage._ITEMS_LIST_OPEN_CLASS);
    }

    static _toggleElementClass(el, className) {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
            console.log(el.offsetHeight);
        }
    }
}