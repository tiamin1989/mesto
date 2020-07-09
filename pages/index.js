import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { initialCards, profileEdit, photoAdd, validateConfig, profileElement, photoPopup } from '../utils/constants.js';

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

const cardPopup = new PopupWithForm('#card',
  // функция для submit
  evt => {
    evt.preventDefault();
    const { first, second } = cardPopup._getInputValues();
    const cardItem = new Section({
      items: [{
        name: first,
        link: second
      }],
      renderer: function (item) {
        const card = new Card(item, '#photo', photoPopup.block, () => { imagePopup.open(item.link, item.name) });
        this.addItem(card.generateCard());
      }
    }, '.photo-grid');
    cardItem.renderItems();
    cardPopup.close();
  },
  addCardValidate);

// Отрисовка начальных карточек
const cardItems = new Section({
  items: initialCards,
  renderer: function (item) {
    const card = new Card(item, '#photo', photoPopup.block, () => { imagePopup.open(item.link, item.name) });
    this.addItem(card.generateCard());
  }
}, '.photo-grid');

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', () => {
  const { name, link } = userInfo.getUserInfo();
  profileElement.name.value = name;
  profileElement.activity.value = link;
  profilePopup.open();
});

// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', () => cardPopup.open());

changeProfileValidate.enableValidation();
addCardValidate.enableValidation();

imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();
cardItems.renderItems();
