export default class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }

    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: {
              authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Ошибка: ' + res.status);
            });
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Ошибка: ' + res.status);
        });
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
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Ошибка: ' + res.status);
        });
    }

    deleteCard(id) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards/'+ id, {
            method: 'DELETE',
            headers: {
                authorization: this._token
              }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Ошибка: ' + res.status);
        });
    }
}   
