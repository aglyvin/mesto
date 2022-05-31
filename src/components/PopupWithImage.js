import { Popup } from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this.imgPopup = this._popup.querySelector('.popup-preview__image');
        this.popUpPreviewCaption = this._popup.querySelector('.popup-preview__photo-caption');
    }
    open({ name, link }) {
        this.popUpPreviewCaption.textContent = name;
        this.imgPopup.src = link;
        this.imgPopup.alt = name;
        super.open();
    }
}