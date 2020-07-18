import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { profileEdit, photoAdd, validateConfig, profileElement, changeAvatar } from '../utils/constants.js';

const changeProfileValidate = new FormValidator(validateConfig, document.forms.profile);
const addCardValidate = new FormValidator(validateConfig, document.forms.card);
const avatarValidate = new FormValidator(validateConfig, document.forms.avatar);

const userInfo = new UserInfo('.profile__name', '.profile__activity', '.profile__photo');
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

const confirmPopup = new PopupWithConfirm('#confirm', (evt, instance) => {
  evt.preventDefault();
  api.deleteCardData(instance._id)
    .then(() => {
      instance.deleteCard();
    })
    .finally(() => {
      confirmPopup.close();
    });
});

const profilePopup = new PopupWithForm('#profile',
  // функция для submit
  (evt, values) => {
    evt.preventDefault();
    profilePopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.savePersonData(values)
      .then(() => {
        userInfo.setUserInfo(values);
        profilePopup._popup.querySelector('.popup__save-button').value = 'Сохранить';
      })
      .finally(() => {
        profilePopup.close();
      });

  },
  changeProfileValidate);

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profileElement.name.value = name;
  profileElement.activity.value = about;
  profilePopup.open();
});

const avatarPopup = new PopupWithForm('#avatar',
  (evt, values) => {
    evt.preventDefault();
    avatarPopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.changeAvatar(values)
      .then(res => {
        document.querySelector('.profile__photo').src = res.avatar;
        avatarPopup._popup.querySelector('.popup__save-button').value = 'Сохранить';
      })
      .finally(() => {
        avatarPopup.close();
      });
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
  (evt, values) => {
    evt.preventDefault();
    cardPopup._popup.querySelector('.popup__save-button').value = 'Сохранение...';
    api.saveCardData(values)
      .then(res => {
        const card = new Card(res,
          '#photo',
          () => { imagePopup.open(res.link, res.name); },
          true,
          () => confirmPopup.confirm(card),
          () => api.likeCard(res.owner, card),
          res.owner._id
        );
        cardList.addItem(card.generateCard());
        cardPopup._popup.querySelector('.popup__save-button').value = 'Создать';
      })
      .finally(() => {
        cardPopup.close();
      });
  },
  addCardValidate);

cardPopup.setEventListeners();
// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', () => cardPopup.open());

changeAvatar.addEventListener('click', () => avatarPopup.open());

// Загружаем имя и деятельность персоны
api.getPersonData(function (name, about, avatar) {
  userInfo.setUserInfo({
    name: name,
    about: about,
    avatar: avatar
  });
})
  .then(currentUser => {
    document.querySelector('.profile__photo').src = currentUser.avatar;
    // Отрисовка карточек
    api.getInitialCards()
      .then(initialCards => {
        initialCards.reverse();
        cardList = new Section({/* нам нужен свой id (currentUser._id), который дает только сервер, поэтому в глобал scope не перенести( сам экземпляр создается только 1 раз */
          items: initialCards,
          renderer: function (item) {
            const card = new Card(
              item,
              '#photo',
              () => { imagePopup.open(item.link, item.name); },
              currentUser._id === item.owner._id,
              () => confirmPopup.confirm(card),
              () => api.likeCard(currentUser, card),
              currentUser._id
            );
            this.addItem(card.generateCard());
          }
        }, '.photo-grid');
        cardList.renderItems();
      });
  });
