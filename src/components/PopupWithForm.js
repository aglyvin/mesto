import { Popup } from "./Popup";

export default class PopupWithForm extends Popup {
    constructor (selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputElements = Array.from(this._form.querySelectorAll('input'));
    }

    _getInputValues() {
        const res = {};
        this._inputElements.forEach(element => {
            res[element.name] = element.value;
        });
        return res;
    }

    _setInputValues(inputs) {
        this._inputElements.forEach(element => {
            element.value = inputs[element.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._inputElements.forEach(el => el.value = '');
    }

    open( inputs = []) {
        this._setInputValues(inputs);
        super.open();

    }
}