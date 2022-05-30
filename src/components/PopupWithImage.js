import { Popup } from "./Popup";

export default class PopupWithImage extends Popup {
    open({ name, link }) {
        const imgPopup = this._popup.querySelector('.popup-preview__image');
        const popUpPreviewCaption = this._popup.querySelector('.popup-preview__photo-caption');
        popUpPreviewCaption.textContent = name;
        imgPopup.src = link;
        imgPopup.alt = name;
        super.open();
    }
}