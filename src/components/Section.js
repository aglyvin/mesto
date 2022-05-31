export class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderAll() {
        this._items.forEach(element => {
            this.addItem(element);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.prepend(element);
    }
}