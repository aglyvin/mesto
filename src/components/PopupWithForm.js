import { Popup } from "./Popup";

export default class PopupWithForm extends Popup {
    constructor (selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputElements = Array.from(this._form.querySelectorAll('input'));
        this._submitBtn = this._form.querySelector('button');
    }

    _getInputValues() {
        const res = {};
        this._inputElements.forEach(element => {
            res[element.name] = element.value;
        });
        return res;
    }

    setBusyStatus() {
        this._submitBtn.textContent = 'Сохранение...';
    }

    resetBusyStatus() {
        this._submitBtn.textContent = 'Сохранить';
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
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    open( inputs = []) {
        this._setInputValues(inputs);
        super.open();
    }
}