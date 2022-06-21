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
        this._likes = likes;
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

        this.updateLikes(this._likes);

        this._element.querySelector('.elements__title').textContent = this.name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this));
        this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick(this));
        this._image.addEventListener('click', () => this._handleCardClick(this));
    }

    _addLikeClass() {
        this._likeButton.classList.add('elements__like-button_liked');
    }

    _removeLikeClass() {
        this._likeButton.classList.remove('elements__like-button_liked');
    }

    updateLikes(likes) {
        this._likes = likes;
        if (this.hasUserLike()) {
            this._addLikeClass();
        }
        else {
            this._removeLikeClass();
        }
        this._updateLikeCount();
    }

    _updateLikeCount() {
        this._likeCount = this._likes.length;
        this._likeElement.textContent = this._likeCount > 0 ? this._likeCount: '';
    }

    hasUserLike() {
        return this._likes.map((l) => l._id).includes(this._userId);
    }

    deleteElement() {
        this._element.remove();
        this._element = null;
    }

}
