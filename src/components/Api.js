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
        });
    }

    setAvatar(avatar) {
        return 
    }
}   
