import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import PopupWithAvatarForm from '../components/PopupWithAvatarForm.js';
import { /* initialCards,  */profileEdit, photoAdd, validateConfig, profileElement, changeAvatar } from '../utils/constants.js';

const changeProfileValidate = new FormValidator(validateConfig, document.forms.profile);
const addCardValidate = new FormValidator(validateConfig, document.forms.card);
const avatarValidate = new FormValidator(validateConfig, document.forms.avatar);

const userInfo = new UserInfo('.profile__name', '.profile__activity');
const imagePopup = new PopupWithImage('#photo-popup');

// Нужно для единого экземпляра Section в разных местах
let cardList;

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '246303c7-23cd-4e0a-b8c9-2c009047ffb2',
    'Content-Type': 'application/json'
  }
});

const confirmPopup = new PopupWithConfirm('#confirm');

const profilePopup = new PopupWithForm('#profile',
  // функция для submit
  evt => {
    evt.preventDefault();
    const inputValues = profilePopup._getInputValues();
    profilePopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.savePersonData(inputValues);
    userInfo.setUserInfo(inputValues);
    profilePopup.close();
    profilePopup._popup.querySelector('.popup__save-button').value = 'Сохранить';
  },
  changeProfileValidate);

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', () => {
  const { first, second } = userInfo.getUserInfo();
  profileElement.name.value = first;
  profileElement.activity.value = second;
  profilePopup.open();
});

const avatarPopup = new PopupWithAvatarForm('#avatar',
  evt => {
    evt.preventDefault();
    avatarPopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.changeAvatar(avatarPopup.getInputValue())
      .then(res => document.querySelector('.profile__photo').src = res.avatar);
    avatarPopup.close();
    avatarPopup._popup.querySelector('.popup__save-button').value = 'Сохранить';
  },
  avatarValidate
);

changeProfileValidate.enableValidation();
addCardValidate.enableValidation();
avatarValidate.enableValidation();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

const cardPopup = new PopupWithForm('#card',
  // функция для submit
  evt => {
    evt.preventDefault();
    const cardInfo = cardPopup._getInputValues();
    delete Object.assign(cardInfo, { ["name"]: cardInfo["first"] })["first"];
    delete Object.assign(cardInfo, { ["link"]: cardInfo["second"] })["second"];
    cardPopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.saveCardData(cardInfo)
      .then(res => {
        const card = new Card(res,
          '#photo',
          () => { imagePopup.open(res.link, res.name); },
          true,
          () => confirmPopup.confirmDel(card),
          () => api.likeCard(res.owner._id, card),
          res.owner._id
        );
        cardList.addItem(card.generateCard());
      });
    cardPopup.close();
    cardPopup._popup.querySelector('.popup__save-button').value = 'Создать';
  },
  addCardValidate);

cardPopup.setEventListeners();
// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', () => cardPopup.open());

changeAvatar.addEventListener('click', () => avatarPopup.open());

// Загружаем имя и деятельность персоны
api.getPersonData(function (name, activity) {
  userInfo.setUserInfo({
    first: name,
    second: activity
  });
})
  .then(currentUser => {
    document.querySelector('.profile__photo').src = currentUser.avatar;
    // Отрисовка карточек
    api.getInitialCards()
      .then(initialCards => {
        initialCards.reverse();
        cardList = new Section({
          items: initialCards,
          renderer: function (item) {
            const card = new Card(
              item,
              '#photo',
              () => { imagePopup.open(item.link, item.name); },
              currentUser._id === item.owner._id ? true : false,
              () => confirmPopup.confirmDel(card),
              () => api.likeCard(currentUser._id, card),
              currentUser._id
            );
            this.addItem(card.generateCard());
          }
        }, '.photo-grid');
        cardList.renderItems();
      });
  });




