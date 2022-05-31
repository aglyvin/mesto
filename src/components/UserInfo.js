export default class UserInfo {
    constructor(nameSelector, userInfoSelector) {
        this._nameElem = document.querySelector(nameSelector);
        this._userInfoElem = document.querySelector(userInfoSelector);

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