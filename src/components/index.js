import '../pages/index.css';
import {Card} from './Card.js';
import { FormValidator } from "./FormValidator.js";
import { initialCards } from '../utils/initialCards.js';
import { Section } from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');
// const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddPhoto = document.querySelector('.popup-add-photo');

// const formEditProfile = popupEditProfile.querySelector('.popup__form');
// const popupName = formEditProfile.querySelector('.popup__input[name=input-name]');
// const popupAbout = formEditProfile.querySelector('.popup__input[name=input-about]');
const formAdd = popupAddPhoto.querySelector('.popup__form');
const photoName = formAdd.querySelector('.popup__input[name=photo-name]');
const photoLink = formAdd.querySelector('.popup__input[name=photo-link]');
const cardsContainerSelector = '.elements';
// const popupPreviewSelector = '.popup-preview';
const popupPreview = new PopupWithImage('.popup-preview');
// const popups = document.querySelectorAll('.popup')


const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};



const userInfo = new UserInfo('.profile__name', '.profile__caption').getUserInfo();
const popupEditProfile = new PopupWithForm('.popup-edit-profile', setProfile);

function setProfile(event) {
    event.preventDefault();
    const values = this._getInputValues();
    const userInfo = new UserInfo('.profile__name', '.profile__caption');
    console.log(userInfo)
    userInfo.setUserInfo({"name": values['input-name'], "about": values['input-about']});
    this.close();
}

profileEditButton.addEventListener('click', () => {
    popupEditProfile.open({'input-name': userInfo.name, 'input-about': userInfo.about});
});



document.querySelector('.profile__add-button').addEventListener('click', () => {
    photoName.value = '';
    photoLink.value = '';
    formValidators['add-place'].resetValidation();
    openPopup(popupAddPhoto);
});

formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = {name: photoName.value, link: photoLink.value};
    renderCard(newCard);
    closePopup(popupAddPhoto);
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