import '../pages/index.css';
import {Card} from './Card.js';
import { FormValidator } from "./FormValidator.js";
import { initialCards } from '../utils/initialCards.js';
import { Section } from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js'

// const profileEditButton = document.querySelector('.profile__edit-button');
// const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddPhoto = document.querySelector('.popup-add-photo');

// const formEditProfile = popupEditProfile.querySelector('.popup__form');
const popupName = formEditProfile.querySelector('.popup__input[name=input-name]');
const popupAbout = formEditProfile.querySelector('.popup__input[name=input-about]');
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



const popupEditProfile = new PopupWithForm('.profile__edit-button', (event) => {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    this.close();
});

profileEditButton.addEventListener('click', () => {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    formValidators['edit-profile'].resetValidation();
    openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEditProfile);
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

// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', handleKeyDown);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleKeyDown);
// }

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

// function handleKeyDown(event) {
//     if (event.code == 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         openedPopup && closePopup(openedPopup);
//     }
// }

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

// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         }
//         if (evt.target.classList.contains('popup__close-button')) {
//           closePopup(popup)
//         }
//     })
// })

enableValidation(config);