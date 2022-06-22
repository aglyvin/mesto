export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: {
              authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    setUserInfo({name, about}) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse);
    }

    setAvatar(avatarUrl) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
        .then(this._checkResponse);
    }

    addCard( cardInfo ) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardInfo)
        })
        .then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards/'+ id, {
            method: 'DELETE',
            headers: {
                authorization: this._token
              }
        })
        .then(this._checkResponse);
    }

    likeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    dislikeCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }

    getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards`, {
            headers: {
              authorization: this._token
            }
        })
        .then(this._checkResponse)
    }
}   
