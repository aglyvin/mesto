export class Section {
    _items;
    _renderer;
    _container;

    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderAll() {
        this._items.array.forEach(element => {
            this.addItem(element);
        });
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.append(element);
    }
}