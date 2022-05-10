import {Card} from './Card.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupPreview = document.querySelector('.popup-preview');
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

popupPreview.querySelector('.popup-preview__close-button').addEventListener('click', () => closePopup(popupPreview));
const popUpPreviewCaption = popupPreview.querySelector('.popup-preview__photo-caption');
const imgPopup = popupPreview.querySelector('.popup-preview__image');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__card');

function renderCard(card) {
    cardsContainer.prepend(createCard(card));
}

function createCard(card) {
    const newCard = cardTemplate.cloneNode(true);
    const img = newCard.querySelector('.elements__image');
    img.src = card['link'];
    img.alt = card['name'];
    newCard.querySelector('.elements__title').textContent = card['name'];
    const likeButton = newCard.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('elements__like-button_liked');
    });
    const deleteButton = newCard.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function() {
        deleteButton.closest('.elements__card').remove();
    });
    img.addEventListener('click', function() {
        popUpPreviewCaption.textContent = card['name'];
        imgPopup.src = card['link'];
        imgPopup.alt = card['name'];
        openPopup(popupPreview);

    });
    return newCard;
}

initialCards.forEach((item) => {
    renderCard(item);
});
