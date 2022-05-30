export class Card {
    constructor({ name, link }, selector, handleCardClick) {
        this.name = name;
        this.link = link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
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
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._deleteButton = this._element.querySelector('.elements__delete-button');

        this._image = this._element.querySelector('.elements__image');
        this._image.src = this.link;
        this._image.alt = this.name;

        this._element.querySelector('.elements__title').textContent = this.name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
        this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
        this._image.addEventListener('click', () => this._handleCardClick(this));
    }

    _handleLikeButtonClick() {   
        this._likeButton.classList.toggle('elements__like-button_liked');
    }

    _handleDeleteButtonClick() {
        this._deleteButton.closest('.elements__card').remove();
    }

}
