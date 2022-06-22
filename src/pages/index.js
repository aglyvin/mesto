import '../pages/index.css';
import {Card} from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupConfirm from '../components/PopupConfirm';
import { 
    validationConfig,
    profileEditButton,
    changeAvatarButton,
    cardsContainerSelector,
    previewSelector,
    editProfileSelector,
    profileNameSelector,
    profileCaptionSelector,
    profileAvatarSelector,
    changeAvatarSelector,
    popupAddPhotoSelector,
    addButtonSelector,
    popupDeleteCardSelector
} from '../utils/constants';

const popupPreview = new PopupWithImage(previewSelector);
const api = new Api('https://nomoreparties.co/v1/cohort-43', '2f9c82fe-9e77-4bc3-9e57-b3177cfe4c33');
let userID;

popupPreview.setEventListeners();

const popupEditProfile = new PopupWithForm(editProfileSelector, (values) => setProfile(values));
popupEditProfile.setEventListeners();

const userInfo = new UserInfo(profileNameSelector, profileCaptionSelector, profileAvatarSelector);
function setProfile(values) {
    popupEditProfile.setBusyStatus();
    api.setUserInfo({"name": values['input-name'], "about": values['input-about']})
    .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err)
    })
    .finally(() => { 
        popupEditProfile.resetBusyStatus()
    });
}

profileEditButton.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupEditProfile.open({'input-name': user.name, 'input-about': user.about});

});

const popupChangeAvatarForm = new PopupWithForm(changeAvatarSelector, (values) => setAvatar(values['input-url']));

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


const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector, (values) => addPhoto(values));
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


document.querySelector(addButtonSelector).addEventListener('click', () => {
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


const confirmDelete = new PopupConfirm(popupDeleteCardSelector, (card) => {
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

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(validationConfig, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationConfig);
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData.avatar);
        userID = userData["_id"];

        cards.reverse().forEach(item => {
            section.addItem(item);
        })
    })
    .catch((err) => console.log('Ошибка. Запрос не выполнен: ', err));
        

