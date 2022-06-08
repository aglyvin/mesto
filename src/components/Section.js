export class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    addItem(item) {
        const element = this._renderer(item);
        this._container.prepend(element);
    }
}