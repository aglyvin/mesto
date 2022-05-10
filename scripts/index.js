import {Card} from './Card.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddPhoto = document.querySelector('.popup-add-photo');
const popUpPreviewCaption = popupPreview.querySelector('.popup-preview__photo-caption');
const imgPopup = popupPreview.querySelector('.popup-preview__image');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const popupName = formEditProfile.querySelector('.popup__input[name=input-name]');
const popupAbout = formEditProfile.querySelector('.popup__input[name=input-about]');
const formAdd = popupAddPhoto.querySelector('.popup__form');
const photoName = formAdd.querySelector('.popup__input[name=photo-name]');
const photoLink = formAdd.querySelector('.popup__input[name=photo-link]');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__card');

profileEditButton.addEventListener('click', () => {
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', function (event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEditProfile);
});


document.querySelector('.profile__add-button').addEventListener('click', () => {
    photoName.value = '';
    photoLink.value = '';
    openPopup(popupAddPhoto);
});

formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = {name: photoName.value, link: photoLink.value};
    renderCard(newCard);
    closePopup(popupAddPhoto);
});

popupAddPhoto.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupAddPhoto));

function openPopup(popup) {
    popup.classList.add('popup_opened');
    clearErrors(popup.querySelector('form'), config);
    document.addEventListener('keydown', handleKeyDown);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleKeyDown);
}

function renderCard(card) {
    cardsContainer.prepend(createCard(card));
}

function createCard(card) {
    let newCard = new Card(card.name, card.link, '#card');
    return newCard.generateCard();
}

function addClickHandler(popup) {
    popup.addEventListener('click', (e, popup) => {
        if(e.target == e.currentTarget) {
            closePopup(e.target);
        }
    });
}

function handleKeyDown(event) {
    const openedPopup = document.querySelector('.popup_opened');
    if(openedPopup && event.code == 'Escape') {
        closePopup(openedPopup);
    }
}

initialCards.forEach((item) => {
    renderCard(item);
});


addClickHandler(popupAddPhoto);
addClickHandler(popupPreview);
addClickHandler(popupEditProfile);
popupAddPhoto.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupAddPhoto));
popupPreview.querySelector('.popup-preview__close-button').addEventListener('click', () => closePopup(popupPreview));
popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEditProfile));