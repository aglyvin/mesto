export default class UserInfo {
    constructor(nameSelector, userInfoSelector, avatarSelector) {
        this._nameElem = document.querySelector(nameSelector);
        this._userInfoElem = document.querySelector(userInfoSelector);
        this._avatarElem = document.querySelector(avatarSelector);

    }

    getUserInfo() {
        return {
            name: this._nameElem.textContent,
            about: this._userInfoElem.textContent,
            avatar: this._avatarElem.src
        };
    }

    setUserInfo( { name, about, avatar }) {
        this._nameElem.textContent = name;
        this._userInfoElem.textContent = about;
        this.setAvatar(avatar);
    }

    setAvatar(avatar) {
        this._avatarElem.src = avatar;
    }
}