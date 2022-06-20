import { Popup } from "./Popup";

export default class PopupConfirm extends Popup {
    constructor (selector, submit) {
        super(selector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submit(this._card);
            this.close();
        });
    }

    open(card) {
        this._card = card;
        super.open();
    }
}