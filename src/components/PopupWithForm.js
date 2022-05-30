import { Popup } from "./Popup";

export default class PopupWithImage extends Popup {
    _submit;
    _form;
    _inputElements;
    constructor (selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputElements = this._form.querySelectorAll('.input');
    }

    _getInputValues() {
        const res = {};
        this._inputElements.forEach(element => {
            res[element.name] = element.value;
        });
        return res;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener(this._submit);
    }

    close() {
        super.close();
        this._inputElements.forEach(el => el.value = '');
    }
}