export class Card {
    constructor({ name, link, likes, owner, _id }, selector, handleCardClick, handleDeleteButtonClick, handleLikeClick, userId) {
        this.id = _id;
        this.name = name;
        this.link = link;
        this._owner = owner;
        this._userId = userId;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._likeCount = likes.length;
        if (this._likeCount < 1) {
            this._likeCount = '';
        }
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
        if (this._owner._id != this._userId) {
            this._deleteButton.style.display = 'none';
        }

        this._image = this._element.querySelector('.elements__image');
        this._image.src = this.link;
        this._image.alt = this.name;

        this._likeElement = this._element.querySelector('.elements__like_count');
        this._likeElement.textContent = this._likeCount;

        this._element.querySelector('.elements__title').textContent = this.name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
        this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this));
        this._image.addEventListener('click', () => this._handleCardClick(this));
    }

    addLike(){
        this._likeButton.classList.toggle('elements__like-button_liked');

    }

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

}
