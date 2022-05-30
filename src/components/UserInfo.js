export default class UserInfo {
    _nameElem;
    _userInfoElem;

    constructor(nameSelector, userInfoSelector) {
        this._nameElem = document.querySelector('.profile__name');
        this._userInfoElem = document.querySelector('.profile__caption');

    }

    getUserInfo() {
        return {
            name: this._nameElem.textContent,
            about: this._userInfoElem.textContent
        };
    }

    setUserInfo( { name, about }) {
        this._nameElem.textContent = name;
        this._userInfoElem.textContent = about;
    }
}