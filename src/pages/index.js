import '../pages/index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';

import PopupConfirm from '../components/PopupConfirm';

const profileEditButton = document.querySelector('.profile__edit-button');
const changeAvatarButton = document.querySelector('.profile__avatar');
const cardsContainerSelector = '.elements';
const popupPreview = new PopupWithImage('.popup-preview');
let userID;

popupPreview.setEventListeners();

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', (values) => setProfile(values));
popupEditProfile.setEventListeners();


const userInfo = new UserInfo('.profile__name', '.profile__caption', '.profile__avatar');
function setProfile(values) {
    popupEditProfile.setBusyStatus();
    api.setUserInfo(userInfo.getUserInfo())
    .then(() => {
        popupEditProfile.resetBusyStatus();
        userInfo.setUserInfo({"name": values['input-name'], "about": values['input-about']});
        popupEditProfile.close();
    })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err)
        .finally(() => popupEditProfile.resetBusyStatus());
    })
}

profileEditButton.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupEditProfile.open({'input-name': user.name, 'input-about': user.about});

});
const popupChangeAvatarForm =   new PopupWithForm('.popup-change-avatar', (values) => setAvatar(values['input-url']));

changeAvatarButton.addEventListener('click', () => {
    popupChangeAvatarForm.open({'input-url': userInfo.getUserInfo().avatar});
});

popupChangeAvatarForm.setEventListeners();

function setAvatar(url) {
    popupChangeAvatarForm.setBusyStatus();
    api.setAvatar(url)
        .then(() => {
            getUserInfoFromServer();
            userInfo.setAvatar(url);
            popupChangeAvatarForm.close();
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err)
        })
        .finally(() => popupChangeAvatarForm.resetBusyStatus());
}

const popupAddPhoto = new PopupWithForm('.popup-add-photo', (values) => addPhoto(values));
popupAddPhoto.setEventListeners();

function addPhoto(values) {
    const newCard = {name: values["photo-name"], link: values["photo-link"] };

    api.addCard(newCard)
        .then((data) => {
            section.addItem(data);
            popupAddPhoto.close();
        })
        .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err))
        .finally();
}

document.querySelector('.profile__add-button').addEventListener('click', () => {
    formValidators['add-place'].resetValidation();
    popupAddPhoto.open({'photo-name': '', 'photo-link': ''});
});

const section = new Section(
    createCard,
    cardsContainerSelector
);


function createCard(card) {
    const newCard = new Card(card, '#card', handleCardClick, handleDeleteCardClick, handleLikeClick, userID);
    return newCard.generateCard();
}

function handleCardClick(card) {
    popupPreview.open(card);
}

function handleLikeClick(card) {
    if (!card.hasUserLike()) {
        api.likeCard(card.id)
        .then((newCard) => { 
            card.updateLikes(newCard.likes);
        })
        .catch((err) => console.log(err));
    }
    else {
        api.dislikeCard(card.id)
        .then((newCard) => { 
            card.updateLikes(newCard.likes);
        })
        .catch((err) => console.log(err));
    }
}

const confirmDelete = new PopupConfirm('.popup-delete-card', (card) => {
    api.deleteCard(card.id)
    .then(() => {
        card.deleteElement();
        confirmDelete.close();
    })
    .catch((err) => console.log(err));
});
confirmDelete.setEventListeners();

function handleDeleteCardClick(card) {

    confirmDelete.open(card);
}

const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);
// Promise.all([api.getUserInfo(), api.getCards()])
//     .then(([userData, cards]) => {
//         userInfo.setUserInfo(userData);
//         userInfo.setAvatar(userData.avatar);
//         userID = userData["_id"];

//         cards.reverse().forEach(item => {
//             section.addItem(item);
//         })
//     })
//     .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err));
        

