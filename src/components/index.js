import '../pages/index.css';
import {Card} from './Card.js';
import { FormValidator } from "./FormValidator.js";
import { initialCards } from '../utils/initialCards.js';
import { Section } from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const cardsContainerSelector = '.elements';
const popupPreview = new PopupWithImage('.popup-preview');

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', setProfile);

const userInfo = new UserInfo('.profile__name', '.profile__caption');
function setProfile(event) {
    event.preventDefault();
    const values = this._getInputValues();
    userInfo.setUserInfo({"name": values['input-name'], "about": values['input-about']});
    this.close();
}

profileEditButton.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupEditProfile.open({'input-name': user.name, 'input-about': user.about});
});

const popupAddPhoto = new PopupWithForm('.popup-add-photo', addPhoto);

function addPhoto(event) {
    event.preventDefault();
    const values = this._getInputValues();
    const newCard = {name: values["photo-name"], link: values["photo-link"] };
    section.addItem(newCard);
    this.close();
}

document.querySelector('.profile__add-button').addEventListener('click', () => {
    formValidators['add-place'].resetValidation();
    popupAddPhoto.open({'photo-name': '', 'photo-link': ''});
});

const section = new Section(
    {
        items: initialCards,
        renderer: createCard
    },
    cardsContainerSelector
);
section.renderAll();

function createCard(card) {
    const newCard = new Card(card, '#card', handleCardClick);
    return newCard.generateCard();
}

function handleCardClick(card) {
    popupPreview.open(card);
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