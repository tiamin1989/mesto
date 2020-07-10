import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards, profileEdit, photoAdd, validateConfig, profileElement } from '../utils/constants.js';

const changeProfileValidate = new FormValidator(validateConfig, document.forms.profile);
const addCardValidate = new FormValidator(validateConfig, document.forms.card);

const userInfo = new UserInfo('.profile__name', '.profile__activity');
const imagePopup = new PopupWithImage('#photo-popup');

const profilePopup = new PopupWithForm('#profile',
  // функция для submit
  evt => {
    evt.preventDefault();
    userInfo.setUserInfo(profilePopup._getInputValues());
    profilePopup.close();
  },
  changeProfileValidate);

// Отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: function (item) {
    const card = new Card(item, '#photo', () => { imagePopup.open(item.second, item.first); });
    this.addItem(card.generateCard());
  }
}, '.photo-grid');

const cardPopup = new PopupWithForm('#card',
  // функция для submit
  evt => {
    evt.preventDefault();
    const cardInfo = cardPopup._getInputValues();
    const card = new Card(cardInfo, '#photo', () => { imagePopup.open(cardInfo.second, cardInfo.first); });
    cardList.addItem(card.generateCard());
    cardPopup.close();
  },
  addCardValidate);

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', () => {
  const { first, second } = userInfo.getUserInfo();
  profileElement.name.value = first;
  profileElement.activity.value = second;
  profilePopup.open();
});

// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', () => cardPopup.open());

changeProfileValidate.enableValidation();
addCardValidate.enableValidation();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
cardList.renderItems();
