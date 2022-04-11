const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');


const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');

const formEditProfile = document.querySelector('#form-edit-profile').content.querySelector('.popup__form');
const popupName = formEditProfile.querySelector('.popup__input[name=input-name]');
const popupAbout = formEditProfile.querySelector('.popup__input[name=input-about]');

profileEditButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    popup.querySelector('.popup__container').querySelector('.popup__title').textContent='Редактировать профиль';
    popup.querySelector('.popup__container').append(formEditProfile);
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
});

formEditProfile.addEventListener('submit', function (event) {
    event.preventDefault();
    profileName.innerHTML = popupName.value;
    profileAbout.innerHTML = popupAbout.value;
    closePopup();
    });

const formAdd = document.querySelector('#form-add').content.querySelector('.popup__form');
const photoName = formAdd.querySelector('.popup__input[name=photo-name]');
const photoLink = formAdd.querySelector('.popup__input[name=photo-link]');

document.querySelector('.profile__add-button').addEventListener('click', function () {
    photoName.value = '';
    photoLink.value = '';
    popup.classList.add('popup_opened');
    popup.querySelector('.popup__container').querySelector('.popup__title').textContent='Новое место';
    popup.querySelector('.popup__container').append(formAdd);
});

formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    const newCard = {name: photoName.value, link: photoLink.value};
    addNewCard(newCard);
    closePopup();
});

const closeButton = document.querySelector('.popup__close-button');

closeButton.addEventListener('click', closePopup);


function closePopup() {
    popup.classList.remove('popup_opened');
    const popupContainerNodes = popup.querySelector('.popup__container').childNodes;
    popupContainerNodes.forEach(function(item) {
        console.log(item.nodeName);
        if (item.nodeName=='FORM') {
            item.parentNode.removeChild(item);
        }
    });
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

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__card');

function addNewCard(card) {
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.elements__image').src = card['link'];
    newCard.querySelector('.elements__title').textContent = card['name'];
    const likeButton = newCard.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('elements__like-button_liked');
        console.log("liked");
    });
    const deleteButton = newCard.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', function() {
        deleteButton.parentElement.remove(newCard);
    });
    newCard.addEventListener('click', function() {
        const previewPopup = document.querySelector('.popup-preview'); 
        previewPopup.querySelector('.popup-preview__photo-caption').textContent=card['name'];
        previewPopup.querySelector('.popup-preview__image').src = card['link'];
        previewPopup.classList.add('popup-preview_opened');
        previewPopup.querySelector('.popup-preview__close-button').addEventListener('click', function() {
            previewPopup.classList.remove("popup-preview_opened")
            console.log('sdf');
        });
    });
    cards.insertBefore(newCard, cards.firstChild);
}

initialCards.forEach((item) => {
    addNewCard(item);
});