let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let popupName =  document.querySelector('.popup__input-name');
let popupAbout =  document.querySelector('.popup__input-about');

let profileName =  document.querySelector('.profile__name');
let profileAbout =  document.querySelector('.profile__caption');



profileEditButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
});

let closeButton = document.querySelector('.popup__close-button');

closeButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});

let form = document.querySelector('.popup__form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    profileName.innerHTML = popupName.value;
    profileAbout.innerHTML = popupAbout.value;
    popup.classList.remove('popup_opened');
});