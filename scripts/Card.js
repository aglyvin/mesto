export class Card {
    constructor(name, link, selector) {
        this._name = name;
        this._link = link;
        this._selector = selector;
    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector('.elements__card')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();

        this._image = this._element.querySelector('.elements__image');
        this._image.src = this._link;
        this._image.alt = this._name;

        this._element.querySelector('.elements__title').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
        this._deleteButton = this._element.querySelector('.elements__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
        this._image.addEventListener('click', () => this._handleImageClick());
    }

    _handleLikeButtonClick() {   
        this._likeButton.classList.toggle('elements__like-button_liked');
    }

    _handleDeleteButtonClick() {
        this._deleteButton.closest('.elements__card').remove();
    }

    _handleImageClick() {
        const popupPreview = document.querySelector('.popup-preview');
        popupPreview.querySelector('.popup-preview__close-button').addEventListener('click', () => popupPreview.classList.remove('popup_opened'));

        const popUpPreviewCaption = popupPreview.querySelector('.popup-preview__photo-caption');
        const imgPopup = popupPreview.querySelector('.popup-preview__image');
        popUpPreviewCaption.textContent = this._name;
        imgPopup.src = this._link;
        imgPopup.alt = this._name;
        popupPreview.classList.add('popup_opened');
    }
}
