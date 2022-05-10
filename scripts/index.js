import {Card} from './Card.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddPhoto = document.querySelector('.popup-add-photo');


const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const popupName = formEditProfile.querySelector('.popup__input[name=input-name]');
const popupAbout = formEditProfile.querySelector('.popup__input[name=input-about]');
popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEditProfile));
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

const formAdd = popupAddPhoto.querySelector('.popup__form');
const photoName = formAdd.querySelector('.popup__input[name=photo-name]');
const photoLink = formAdd.querySelector('.popup__input[name=photo-link]');

document.querySelector('.profile__add-button').addEventListener('click', () => {
    photoName.value = '';
    photoLink.value = '';
    // popup.querySelector('.popup__container').append(formAdd);
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
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const cardsContainer = document.querySelector('.elements');

function renderCard(card) {
    cardsContainer.prepend(createCard(card));
}

function createCard(card) {
    let newCard = new Card(card.name, card.link, '#card');
    return newCard.generateCard();
}

initialCards.forEach((item) => {
    renderCard(item);
});
